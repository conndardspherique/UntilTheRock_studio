# 🎸 UntilTheRock Studio - Site Web Complet

Site web professionnel pour studio de musique avec système de réservation et administration.

## 📋 Fonctionnalités

- ✅ Page d'accueil moderne avec animations
- ✅ Réservation de matériel musical
- ✅ Réservation de studios d'enregistrement
- ✅ Demandes de mastering
- ✅ Réservation de sessions d'enregistrement
- ✅ Formulaire de contact
- ✅ Dashboard administrateur sécurisé
- ✅ Gestion des portfolios par service
- ✅ Pages légales (Mentions légales, CGV, Politique de confidentialité)
- ✅ Design responsive et animations modernes
- ✅ Navigation SPA (Single Page Application)

## 🛠️ Technologies

**Backend:**
- Node.js + Express
- SQLite (base de données)
- JWT (authentification)
- Bcrypt (sécurité mots de passe)

**Frontend:**
- HTML5 / CSS3
- JavaScript Vanilla (pas de framework)
- Animations CSS modernes

## 📁 Structure du Projet

```
untiltherock/
├── backend/
│   ├── server.js                 # Serveur principal
│   ├── database.js               # Configuration BDD
│   ├── routes/
│   │   ├── auth.js              # Routes authentification
│   │   ├── bookings.js          # Routes réservations
│   │   ├── portfolio.js         # Routes portfolio
│   │   └── contact.js           # Routes contact
│   ├── middleware/
│   │   └── auth.js              # Middleware JWT
│   ├── package.json
│   └── untiltherock.db          # BDD SQLite (créée auto)
├── frontend/
│   ├── index.html               # Page principale
│   ├── css/
│   │   └── style.css            # Styles complets
│   └── js/
│       ├── main.js              # Navigation & pages
│       └── api.js               # Client API
├── .env                         # Configuration (à créer)
├── .env.example                 # Template configuration
└── README.md
```

## 🚀 Installation Locale (Test)

### 1. Prérequis

- Node.js (version 16 ou supérieure)
- npm (inclus avec Node.js)

### 2. Installation

```bash
# Cloner ou télécharger le projet
cd untiltherock

# Installer les dépendances backend
cd backend
npm install

# Retour au dossier racine
cd ..
```

### 3. Configuration

```bash
# Créer le fichier .env à partir du template
cp .env.example .env

# Éditer .env et changer le JWT_SECRET
nano .env  # ou utilisez votre éditeur préféré
```

**Important:** Changez absolument `JWT_SECRET` en production !

### 4. Démarrage

```bash
# Depuis le dossier backend
cd backend
npm start

# Le serveur démarre sur http://localhost:3000
```

### 5. Accès Admin par défaut

**Première connexion:**
- URL: http://localhost:3000/admin-login
- Username: `admin`
- Password: `admin123`

⚠️ **CHANGEZ LE MOT DE PASSE EN PRODUCTION !**

## 📦 Déploiement sur VPS

### 1. Préparer le VPS

```bash
# Se connecter au VPS via SSH
ssh root@votre_ip_vps

# Mettre à jour le système
apt update && apt upgrade -y

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Installer PM2 (gestionnaire de processus)
npm install -g pm2

# Installer Nginx (serveur web)
apt install -y nginx
```

### 2. Transférer les fichiers

```bash
# Depuis votre machine locale
# Créer une archive du projet
tar -czf untiltherock.tar.gz untiltherock/

# Transférer vers le VPS
scp untiltherock.tar.gz root@votre_ip_vps:/var/www/

# Se connecter au VPS
ssh root@votre_ip_vps

# Décompresser
cd /var/www
tar -xzf untiltherock.tar.gz
cd untiltherock/backend
```

### 3. Installer et configurer

```bash
# Installer les dépendances
npm install --production

# Créer le fichier .env
nano .env

# Contenu du .env (CHANGEZ LES VALEURS):
PORT=3000
JWT_SECRET=votre_secret_tres_securise_production
NODE_ENV=production
```

### 4. Configurer PM2

```bash
# Démarrer l'application avec PM2
pm2 start server.js --name untiltherock

# Configurer le démarrage automatique
pm2 startup
pm2 save

# Vérifier le statut
pm2 status
pm2 logs untiltherock
```

### 5. Configurer Nginx

```bash
# Créer le fichier de configuration
nano /etc/nginx/sites-available/untiltherock

# Coller cette configuration:
```

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activer le site
ln -s /etc/nginx/sites-available/untiltherock /etc/nginx/sites-enabled/

# Tester la configuration
nginx -t

# Redémarrer Nginx
systemctl restart nginx
```

### 6. Installer SSL avec Let's Encrypt (HTTPS)

```bash
# Installer Certbot
apt install -y certbot python3-certbot-nginx

# Obtenir le certificat SSL
certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Le renouvellement automatique est configuré
```

### 7. Configuration du pare-feu

```bash
# Autoriser HTTP et HTTPS
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable
ufw status
```

## 🔐 Sécurité en Production

### Recommandations importantes:

1. **Changez le mot de passe admin:**
   - Connectez-vous au dashboard
   - Accédez à la base de données et changez le hash du mot de passe

2. **Sécurisez le JWT_SECRET:**
   - Utilisez une chaîne aléatoire longue et complexe
   - Ne la commitez JAMAIS dans Git

3. **Base de données:**
   - Sauvegardez régulièrement `untiltherock.db`
   - Configurez des backups automatiques

4. **Mises à jour:**
   ```bash
   # Mettre à jour les dépendances régulièrement
   cd /var/www/untiltherock/backend
   npm update
   pm2 restart untiltherock
   ```

5. **Monitoring:**
   ```bash
   # Surveiller les logs
   pm2 logs untiltherock
   
   # Surveiller les performances
   pm2 monit
   ```

## 📊 Gestion de la Base de Données

### Backup manuel:

```bash
# Créer un backup
cp /var/www/untiltherock/backend/untiltherock.db /backups/untiltherock_$(date +%Y%m%d).db
```

### Backup automatique (cron):

```bash
# Éditer crontab
crontab -e

# Ajouter cette ligne (backup quotidien à 2h du matin):
0 2 * * * cp /var/www/untiltherock/backend/untiltherock.db /backups/untiltherock_$(date +\%Y\%m\%d).db
```

## 🔄 Mise à jour du Site

```bash
# Sur le VPS
cd /var/www/untiltherock/backend
git pull  # si vous utilisez Git
# ou transférez les nouveaux fichiers via SCP

npm install
pm2 restart untiltherock
```

## 📝 Personnalisation

### Modifier les informations du studio:

1. **Mentions légales** - Éditez dans `frontend/js/main.js` la fonction `mentionsLegalesPage()`
2. **Services proposés** - Modifiez les options dans les formulaires
3. **Couleurs** - Changez les variables CSS dans `frontend/css/style.css` (`:root`)
4. **Logo** - Remplacez le texte du logo dans le HTML

### Ajouter un service:

1. Créez une nouvelle route dans `backend/routes/bookings.js`
2. Ajoutez une table dans `database.js`
3. Créez la page frontend dans `main.js`
4. Ajoutez le lien dans la navbar

## 🐛 Dépannage

### Le serveur ne démarre pas:
```bash
# Vérifier les logs
pm2 logs untiltherock

# Vérifier si le port est utilisé
netstat -tulpn | grep 3000
```

### Erreur de base de données:
```bash
# Supprimer la BDD et la recréer
rm untiltherock.db
pm2 restart untiltherock
```

### Problème Nginx:
```bash
# Vérifier la config
nginx -t

# Voir les logs
tail -f /var/log/nginx/error.log
```

## 📞 Support

Pour toute question sur le code:
- Email: [votre email support]

## 📄 Licence

© 2026 UntilTheRock Studio - Tous droits réservés

---

**Made with ❤️ for UntilTheRock Studio**