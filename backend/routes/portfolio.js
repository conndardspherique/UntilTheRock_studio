const express = require('express');
const { db } = require('../database');
const authMiddleware = require('../middleware/auth');
const { uploadFields, deleteFile } = require('../upload');
const { logger } = require('../logger');

const router = express.Router();

// Récupérer tous les portfolios (public)
router.get('/', (req, res) => {
  const { service_type } = req.query;
  
  let query = 'SELECT * FROM portfolio';
  let params = [];
  
  if (service_type) {
    query += ' WHERE service_type = ?';
    params.push(service_type);
  }
  
  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(rows);
  });
});

// Ajouter un élément au portfolio avec fichiers (admin)
router.post('/', authMiddleware, uploadFields, (req, res) => {
  const { service_type, title, description } = req.body;
  
  if (!service_type || !title) {
    return res.status(400).json({ error: 'Service type et titre requis' });
  }

  // Construire les URLs des fichiers uploadés
  let image_url = null;
  let audio_url = null;
  let video_url = null;

  if (req.files['image']) {
    const file = req.files['image'][0];
    image_url = `/assets/uploads/images/${file.filename}`;
  }

  if (req.files['audio']) {
    const file = req.files['audio'][0];
    audio_url = `/assets/uploads/audio/${file.filename}`;
  }

  if (req.files['video']) {
    const file = req.files['video'][0];
    video_url = `/assets/uploads/videos/${file.filename}`;
  }

  db.run(
    `INSERT INTO portfolio (service_type, title, description, image_url, audio_url, video_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [service_type, title, description, image_url, audio_url, video_url],
    function(err) {
      if (err) {
        logger.error('Erreur insertion portfolio:', err);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout' });
      }
      
      logger.admin('Ajout portfolio', req.admin.id, { 
        portfolioId: this.lastID, 
        title 
      });
      
      res.json({ 
        message: 'Élément ajouté', 
        id: this.lastID,
        image_url,
        audio_url,
        video_url
      });
    }
  );
});

// Modifier un élément (admin)
router.put('/:id', authMiddleware, uploadFields, (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // D'abord, récupérer l'élément existant
  db.get('SELECT * FROM portfolio WHERE id = ?', [id], (err, existing) => {
    if (err || !existing) {
      return res.status(404).json({ error: 'Élément non trouvé' });
    }

    // Utiliser les nouvelles valeurs ou garder les anciennes
    let image_url = existing.image_url;
    let audio_url = existing.audio_url;
    let video_url = existing.video_url;

    // Si de nouveaux fichiers sont uploadés, mettre à jour
    if (req.files['image']) {
      // Supprimer l'ancien fichier
      if (existing.image_url) {
        deleteFile(existing.image_url).catch(console.error);
      }
      image_url = `/assets/uploads/images/${req.files['image'][0].filename}`;
    }

    if (req.files['audio']) {
      if (existing.audio_url) {
        deleteFile(existing.audio_url).catch(console.error);
      }
      audio_url = `/assets/uploads/audio/${req.files['audio'][0].filename}`;
    }

    if (req.files['video']) {
      if (existing.video_url) {
        deleteFile(existing.video_url).catch(console.error);
      }
      video_url = `/assets/uploads/videos/${req.files['video'][0].filename}`;
    }

    db.run(
      `UPDATE portfolio 
       SET title = ?, description = ?, image_url = ?, audio_url = ?, video_url = ?
       WHERE id = ?`,
      [title, description, image_url, audio_url, video_url, id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erreur lors de la modification' });
        }
        
        logger.admin('Modification portfolio', req.admin.id, { portfolioId: id });
        
        res.json({ 
          message: 'Élément modifié',
          image_url,
          audio_url,
          video_url
        });
      }
    );
  });
});

// Supprimer un élément (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  // D'abord récupérer l'élément pour supprimer les fichiers
  db.get('SELECT * FROM portfolio WHERE id = ?', [id], async (err, item) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (!item) {
      return res.status(404).json({ error: 'Élément non trouvé' });
    }

    // Supprimer les fichiers physiques
    const deletePromises = [];
    
    if (item.image_url) {
      deletePromises.push(deleteFile(item.image_url));
    }
    if (item.audio_url) {
      deletePromises.push(deleteFile(item.audio_url));
    }
    if (item.video_url) {
      deletePromises.push(deleteFile(item.video_url));
    }

    try {
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Erreur suppression fichiers:', error);
      // Continue quand même la suppression en BDD
    }

    // Supprimer de la base de données
    db.run('DELETE FROM portfolio WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la suppression' });
      }
      
      logger.admin('Suppression portfolio', req.admin.id, { portfolioId: id });
      
      res.json({ message: 'Élément supprimé' });
    });
  });
});

// Supprimer un fichier spécifique d'un élément
router.delete('/:id/file/:type', authMiddleware, (req, res) => {
  const { id, type } = req.params;
  
  const allowedTypes = ['image', 'audio', 'video'];
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Type invalide' });
  }

  const column = `${type}_url`;

  // Récupérer l'URL du fichier
  db.get(`SELECT ${column} FROM portfolio WHERE id = ?`, [id], async (err, item) => {
    if (err || !item) {
      return res.status(404).json({ error: 'Élément non trouvé' });
    }

    const fileUrl = item[column];
    
    if (fileUrl) {
      try {
        await deleteFile(fileUrl);
      } catch (error) {
        console.error('Erreur suppression fichier:', error);
      }
    }

    // Mettre à NULL dans la BDD
    db.run(
      `UPDATE portfolio SET ${column} = NULL WHERE id = ?`,
      [id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erreur mise à jour' });
        }
        
        logger.admin('Suppression fichier portfolio', req.admin.id, { 
          portfolioId: id, 
          type 
        });
        
        res.json({ message: `${type} supprimé` });
      }
    );
  });
});

module.exports = router;