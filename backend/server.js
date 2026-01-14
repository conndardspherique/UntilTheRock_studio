require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');
const { runMigrations } = require('./migrations');
const { logger, requestLogger } = require('./logger');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);  // Logger les requêtes

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// Route pour toutes les pages HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Initialiser la base de données et démarrer le serveur
db.initialize()
  .then(() => runMigrations())
  .then(() => {
    app.listen(PORT, () => {
      logger.success(`Serveur UntilTheRock démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    logger.error('Erreur lors de l\'initialisation:', err);
    process.exit(1);
  });

module.exports = app;