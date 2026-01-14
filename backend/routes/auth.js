const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt_changez_moi';

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username et password requis' });
  }

  db.get('SELECT * FROM admin WHERE username = ?', [username], async (err, admin) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (!admin) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    });
  });
});

// Vérifier le token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, admin: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
});

module.exports = router;