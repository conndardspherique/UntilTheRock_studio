const express = require('express');
const { db } = require('../database');
const authMiddleware = require('../middleware/auth');

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

// Ajouter un élément au portfolio (admin)
router.post('/', authMiddleware, (req, res) => {
  const { service_type, title, description, image_url, audio_url } = req.body;

  db.run(
    `INSERT INTO portfolio (service_type, title, description, image_url, audio_url)
     VALUES (?, ?, ?, ?, ?)`,
    [service_type, title, description, image_url, audio_url],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de l\'ajout' });
      }
      res.json({ message: 'Élément ajouté', id: this.lastID });
    }
  );
});

// Modifier un élément (admin)
router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, audio_url } = req.body;

  db.run(
    `UPDATE portfolio SET title = ?, description = ?, image_url = ?, audio_url = ?
     WHERE id = ?`,
    [title, description, image_url, audio_url, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la modification' });
      }
      res.json({ message: 'Élément modifié' });
    }
  );
});

// Supprimer un élément (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM portfolio WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
    res.json({ message: 'Élément supprimé' });
  });
});

module.exports = router;