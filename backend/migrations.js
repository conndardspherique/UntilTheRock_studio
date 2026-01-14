const { db } = require('./database');

/**
 * Système de migrations pour gérer les évolutions de la base de données
 */

const migrations = [
  {
    version: 1,
    description: "Tables initiales",
    up: () => {
      // Déjà créé dans database.js
      console.log("✅ Migration v1 - Tables initiales (déjà créées)");
    }
  }
  // Ajoutez vos futures migrations ici
];

// Table pour tracker les migrations appliquées
const createMigrationTable = () => {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS migrations (
      version INTEGER PRIMARY KEY,
      description TEXT,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Obtenir la version actuelle
const getCurrentVersion = () => {
  return new Promise((resolve, reject) => {
    db.get('SELECT MAX(version) as version FROM migrations', [], (err, row) => {
      if (err) reject(err);
      else resolve(row?.version || 0);
    });
  });
};

// Appliquer une migration
const applyMigration = (migration) => {
  return new Promise(async (resolve, reject) => {
    try {
      await migration.up();
      
      db.run(
        'INSERT INTO migrations (version, description) VALUES (?, ?)',
        [migration.version, migration.description],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

// Exécuter toutes les migrations en attente
const runMigrations = async () => {
  try {
    await createMigrationTable();
    const currentVersion = await getCurrentVersion();
    
    console.log(`📊 Version actuelle de la base de données: ${currentVersion}`);
    
    const pendingMigrations = migrations.filter(m => m.version > currentVersion);
    
    if (pendingMigrations.length === 0) {
      console.log('✅ Base de données à jour');
      return;
    }
    
    console.log(`🔄 ${pendingMigrations.length} migration(s) à appliquer...`);
    
    for (const migration of pendingMigrations) {
      console.log(`⏳ Application de la migration v${migration.version}: ${migration.description}`);
      await applyMigration(migration);
    }
    
    console.log('✅ Toutes les migrations ont été appliquées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors des migrations:', error);
    throw error;
  }
};

module.exports = { runMigrations };