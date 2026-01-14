module.exports = {
  apps: [
    {
      name: 'untiltherock',
      script: './backend/server.js',
      
      // Mode cluster pour meilleures performances
      instances: 1,
      exec_mode: 'cluster',
      
      // Redémarrage automatique
      watch: false,
      max_memory_restart: '500M',
      
      // Variables d'environnement
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      
      // Logs
      error_file: './backend/logs/pm2-error.log',
      out_file: './backend/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Redémarrage en cas d'erreur
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Délai entre les redémarrages
      restart_delay: 4000,
      
      // Signal de kill
      kill_timeout: 5000,
      
      // Gestion des exceptions
      catch_exceptions: true
    }
  ],

  // Configuration de déploiement
  deploy: {
    production: {
      user: 'root',
      host: 'VOTRE_IP_VPS',  // À remplacer
      ref: 'origin/main',
      repo: 'VOTRE_REPO_GIT',  // À remplacer si vous utilisez Git
      path: '/var/www/untiltherock',
      'post-deploy': 'cd backend && npm install --production && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};