#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * Script de backup de la base de données
 * Usage: node backup.js
 */

const BACKUP_DIR = path.join(__dirname, 'backups');
const DB_FILE = path.join(__dirname, 'untiltherock.db');

// Créer le dossier backups s'il n'existe pas
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR);
  console.log('✅ Dossier backups créé');
}

// Générer le nom du fichier backup
const generateBackupName = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `untiltherock_${year}${month}${day}_${hours}${minutes}.db`;
};

// Créer le backup
const createBackup = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(DB_FILE)) {
      reject(new Error('Base de données non trouvée'));
      return;
    }

    const backupName = generateBackupName();
    const backupPath = path.join(BACKUP_DIR, backupName);

    // Copier le fichier
    fs.copyFile(DB_FILE, backupPath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Calculer la taille du backup
      const stats = fs.statSync(backupPath);
      const sizeKB = (stats.size / 1024).toFixed(2);

      console.log('✅ Backup créé avec succès!');
      console.log(`📁 Fichier: ${backupName}`);
      console.log(`📊 Taille: ${sizeKB} KB`);
      console.log(`📍 Emplacement: ${backupPath}`);

      resolve(backupPath);
    });
  });
};

// Nettoyer les vieux backups (garder les 30 derniers)
const cleanOldBackups = () => {
  const MAX_BACKUPS = 30;

  fs.readdir(BACKUP_DIR, (err, files) => {
    if (err) {
      console.error('❌ Erreur lecture dossier backups:', err);
      return;
    }

    // Filtrer uniquement les fichiers .db
    const backupFiles = files
      .filter(f => f.endsWith('.db'))
      .map(f => ({
        name: f,
        path: path.join(BACKUP_DIR, f),
        time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time); // Trier du plus récent au plus ancien

    // Supprimer les backups en excès
    if (backupFiles.length > MAX_BACKUPS) {
      const toDelete = backupFiles.slice(MAX_BACKUPS);
      
      console.log(`🧹 Nettoyage: ${toDelete.length} ancien(s) backup(s) supprimé(s)`);
      
      toDelete.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`❌ Erreur suppression ${file.name}:`, err);
          }
        });
      });
    }
  });
};

// Lister les backups existants
const listBackups = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(BACKUP_DIR, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const backups = files
        .filter(f => f.endsWith('.db'))
        .map(f => {
          const stats = fs.statSync(path.join(BACKUP_DIR, f));
          return {
            name: f,
            size: (stats.size / 1024).toFixed(2) + ' KB',
            date: stats.mtime.toLocaleString('fr-FR')
          };
        })
        .sort((a, b) => b.date.localeCompare(a.date));

      resolve(backups);
    });
  });
};

// Restaurer un backup
const restoreBackup = (backupName) => {
  return new Promise((resolve, reject) => {
    const backupPath = path.join(BACKUP_DIR, backupName);

    if (!fs.existsSync(backupPath)) {
      reject(new Error('Backup non trouvé'));
      return;
    }

    // Créer un backup de sécurité avant restauration
    const safetyBackup = path.join(BACKUP_DIR, `AVANT_RESTORE_${generateBackupName()}`);
    
    fs.copyFile(DB_FILE, safetyBackup, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err);
        return;
      }

      // Restaurer le backup
      fs.copyFile(backupPath, DB_FILE, (err) => {
        if (err) {
          reject(err);
          return;
        }

        console.log('✅ Base de données restaurée!');
        console.log(`📁 Depuis: ${backupName}`);
        console.log(`🔒 Backup de sécurité créé: AVANT_RESTORE_${generateBackupName()}`);
        
        resolve();
      });
    });
  });
};

// Interface CLI
const args = process.argv.slice(2);
const command = args[0];

(async () => {
  try {
    switch (command) {
      case 'create':
      case undefined:
        await createBackup();
        cleanOldBackups();
        break;

      case 'list':
        const backups = await listBackups();
        console.log('\n📋 Backups disponibles:\n');
        if (backups.length === 0) {
          console.log('Aucun backup trouvé');
        } else {
          backups.forEach((b, i) => {
            console.log(`${i + 1}. ${b.name}`);
            console.log(`   Taille: ${b.size} | Date: ${b.date}\n`);
          });
        }
        break;

      case 'restore':
        const backupName = args[1];
        if (!backupName) {
          console.error('❌ Usage: node backup.js restore <nom_backup>');
          process.exit(1);
        }
        await restoreBackup(backupName);
        break;

      case 'help':
        console.log(`
🗂️  Script de Backup UntilTheRock

Commandes disponibles:
  node backup.js                  Créer un nouveau backup
  node backup.js create           Créer un nouveau backup
  node backup.js list             Lister les backups existants
  node backup.js restore <nom>    Restaurer un backup
  node backup.js help             Afficher cette aide

Exemples:
  node backup.js
  node backup.js list
  node backup.js restore untiltherock_20260113_1430.db
        `);
        break;

      default:
        console.error(`❌ Commande inconnue: ${command}`);
        console.log('Utilisez "node backup.js help" pour voir les commandes disponibles');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
})();