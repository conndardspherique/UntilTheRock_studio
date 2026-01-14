const express = require('express');
const { db } = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Envoyer un message de contact
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  db.run(
    `INSERT INTO contacts (name, email, subject, message)
     VALUES (?, ?, ?, ?)`,
    [name, email, subject, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de l\'envoi' });
      }
      res.json({ message: 'Message envoyé avec succès', id: this.lastID });
    }
  );
});

// Admin: Récupérer tous les messages
router.get('/', authMiddleware, (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(rows);
  });
});

// Admin: Marquer comme lu
router.put('/:id/status', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run('UPDATE contacts SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erreur mise à jour' });
    }
    res.json({ message: 'Statut mis à jour' });
  });
});

module.exports = router;