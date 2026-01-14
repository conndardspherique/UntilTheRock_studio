const express = require('express');
const { db } = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Réservation matériel
router.post('/equipment', (req, res) => {
  const { name, email, phone, equipment, start_date, end_date, message } = req.body;

  db.run(
    `INSERT INTO booking_equipment (name, email, phone, equipment, start_date, end_date, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, equipment, start_date, end_date, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la réservation' });
      }
      res.json({ message: 'Réservation enregistrée', id: this.lastID });
    }
  );
});

// Réservation studio
router.post('/studio', (req, res) => {
  const { name, email, phone, studio_type, date, time_slot, duration, message } = req.body;

  db.run(
    `INSERT INTO booking_studio (name, email, phone, studio_type, date, time_slot, duration, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, studio_type, date, time_slot, duration, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la réservation' });
      }
      res.json({ message: 'Réservation enregistrée', id: this.lastID });
    }
  );
});

// Demande mastering
router.post('/mastering', (req, res) => {
  const { name, email, phone, track_count, format, message } = req.body;

  db.run(
    `INSERT INTO mastering_requests (name, email, phone, track_count, format, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, track_count, format, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la demande' });
      }
      res.json({ message: 'Demande enregistrée', id: this.lastID });
    }
  );
});

// Session enregistrement
router.post('/recording', (req, res) => {
  const { name, email, phone, project_type, date, duration, message } = req.body;

  db.run(
    `INSERT INTO recording_sessions (name, email, phone, project_type, date, duration, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, project_type, date, duration, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la réservation' });
      }
      res.json({ message: 'Session enregistrée', id: this.lastID });
    }
  );
});

// Admin: Récupérer toutes les réservations
router.get('/all', authMiddleware, (req, res) => {
  const queries = {
    equipment: 'SELECT * FROM booking_equipment ORDER BY created_at DESC',
    studio: 'SELECT * FROM booking_studio ORDER BY created_at DESC',
    mastering: 'SELECT * FROM mastering_requests ORDER BY created_at DESC',
    recording: 'SELECT * FROM recording_sessions ORDER BY created_at DESC'
  };

  const results = {};
  let completed = 0;

  Object.keys(queries).forEach(key => {
    db.all(queries[key], [], (err, rows) => {
      if (!err) results[key] = rows;
      completed++;
      if (completed === Object.keys(queries).length) {
        res.json(results);
      }
    });
  });
});

// Admin: Mettre à jour le statut
router.put('/:type/:id/status', authMiddleware, (req, res) => {
  const { type, id } = req.params;
  const { status } = req.body;

  const tableMap = {
    equipment: 'booking_equipment',
    studio: 'booking_studio',
    mastering: 'mastering_requests',
    recording: 'recording_sessions'
  };

  const table = tableMap[type];
  if (!table) {
    return res.status(400).json({ error: 'Type invalide' });
  }

  db.run(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erreur mise à jour' });
    }
    res.json({ message: 'Statut mis à jour' });
  });
});

module.exports = router;