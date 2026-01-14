const fs = require('fs');
const path = require('path');

// Créer le dossier logs s'il n'existe pas
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Couleurs pour les logs en console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Formater la date
const formatDate = () => {
  return new Date().toISOString();
};

// Écrire dans un fichier de log
const writeToFile = (filename, message) => {
  const logFile = path.join(logsDir, filename);
  const timestamp = formatDate();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error('Erreur écriture log:', err);
  });
};

// Logger principal
const logger = {
  info: (message, context = {}) => {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`);
    writeToFile('info.log', `[INFO] ${msg} ${JSON.stringify(context)}`);
  },

  success: (message, context = {}) => {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`);
    writeToFile('info.log', `[SUCCESS] ${msg} ${JSON.stringify(context)}`);
  },

  warn: (message, context = {}) => {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${msg}`);
    writeToFile('warn.log', `[WARN] ${msg} ${JSON.stringify(context)}`);
  },

  error: (message, error = null, context = {}) => {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    console.error(`${colors.red}[ERROR]${colors.reset} ${msg}`);
    
    let errorDetails = msg;
    if (error) {
      errorDetails += ` | Error: ${error.message} | Stack: ${error.stack}`;
    }
    
    writeToFile('error.log', `[ERROR] ${errorDetails} ${JSON.stringify(context)}`);
  },

  // Logger pour les requêtes HTTP
  request: (req, res, duration) => {
    const msg = `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`;
    console.log(`${colors.cyan}[HTTP]${colors.reset} ${msg}`);
    
    writeToFile('access.log', `[HTTP] ${msg} | IP: ${req.ip} | User-Agent: ${req.get('user-agent')}`);
  },

  // Logger pour les actions admin
  admin: (action, adminId, details = {}) => {
    const msg = `Admin ${adminId} - ${action}`;
    console.log(`${colors.magenta}[ADMIN]${colors.reset} ${msg}`);
    writeToFile('admin.log', `[ADMIN] ${msg} ${JSON.stringify(details)}`);
  },

  // Logger pour les réservations
  booking: (type, data) => {
    const msg = `Nouvelle réservation ${type}`;
    console.log(`${colors.green}[BOOKING]${colors.reset} ${msg}`);
    writeToFile('bookings.log', `[BOOKING] ${msg} ${JSON.stringify(data)}`);
  }
};

// Middleware Express pour logger les requêtes
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Capturer la fin de la réponse
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.request(req, res, duration);
  });
  
  next();
};

// Nettoyer les vieux logs (garder 30 jours)
const cleanOldLogs = () => {
  const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 jours en ms
  
  fs.readdir(logsDir, (err, files) => {
    if (err) return;
    
    files.forEach(file => {
      const filePath = path.join(logsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        
        const fileAge = Date.now() - stats.mtime.getTime();
        if (fileAge > maxAge) {
          fs.unlink(filePath, (err) => {
            if (!err) logger.info(`Log supprimé: ${file}`);
          });
        }
      });
    });
  });
};

// Nettoyer les logs au démarrage et tous les jours
cleanOldLogs();
setInterval(cleanOldLogs, 24 * 60 * 60 * 1000);

module.exports = { logger, requestLogger };