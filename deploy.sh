#!/bin/bash

# Script de déploiement pour UntilTheRock Studio
# Usage: ./deploy.sh [production|staging]

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
VPS_USER="root"
VPS_HOST=""  # À remplir avec l'IP de votre VPS
VPS_PATH="/var/www/untiltherock"
APP_NAME="untiltherock"

# Fonction pour afficher les messages
log() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Vérifier les arguments
if [ -z "$1" ]; then
    error "Usage: ./deploy.sh [production|staging]"
fi

ENVIRONMENT=$1

# Vérifier que l'hôte VPS est configuré
if [ -z "$VPS_HOST" ]; then
    error "VPS_HOST non configuré dans le script. Éditez deploy.sh et ajoutez l'IP de votre VPS."
fi

log "🚀 Démarrage du déploiement vers $ENVIRONMENT..."

# Étape 1: Tests locaux
log "📋 Vérification des fichiers..."
if [ ! -f "backend/package.json" ]; then
    error "Fichier backend/package.json non trouvé"
fi

if [ ! -f "frontend/index.html" ]; then
    error "Fichier frontend/index.html non trouvé"
fi

# Étape 2: Créer une archive
log "📦 Création de l'archive..."
ARCHIVE_NAME="untiltherock_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf $ARCHIVE_NAME \
    --exclude='node_modules' \
    --exclude='*.db' \
    --exclude='.env' \
    --exclude='.git' \
    backend/ frontend/ .env.example

log "✅ Archive créée: $ARCHIVE_NAME"

# Étape 3: Transférer vers le VPS
log "📤 Transfert vers le VPS..."
scp $ARCHIVE_NAME ${VPS_USER}@${VPS_HOST}:/tmp/

# Étape 4: Déploiement sur le VPS
log "🔧 Déploiement sur le VPS..."
ssh ${VPS_USER}@${VPS_HOST} << EOF
    set -e
    
    echo "📂 Création du backup..."
    if [ -d "$VPS_PATH" ]; then
        tar -czf /backups/untiltherock_backup_\$(date +%Y%m%d_%H%M%S).tar.gz -C $VPS_PATH .
    fi
    
    echo "📦 Extraction de la nouvelle version..."
    mkdir -p $VPS_PATH
    cd $VPS_PATH
    tar -xzf /tmp/$ARCHIVE_NAME
    
    echo "🔧 Installation des dépendances..."
    cd backend
    npm install --production
    
    echo "🔄 Redémarrage de l'application..."
    pm2 restart $APP_NAME || pm2 start server.js --name $APP_NAME
    
    echo "🧹 Nettoyage..."
    rm /tmp/$ARCHIVE_NAME
    
    echo "✅ Déploiement terminé!"
EOF

# Étape 5: Vérification
log "🔍 Vérification du déploiement..."
ssh ${VPS_USER}@${VPS_HOST} "pm2 status $APP_NAME"

# Nettoyage local
log "🧹 Nettoyage local..."
rm $ARCHIVE_NAME

log "✅ Déploiement réussi!"
log "🌐 Votre site est maintenant en ligne sur http://$VPS_HOST"

# Afficher les logs
warning "Pour voir les logs en temps réel: ssh $VPS_USER@$VPS_HOST 'pm2 logs $APP_NAME'"