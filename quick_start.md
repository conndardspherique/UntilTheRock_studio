# 🚀 Guide de Démarrage Rapide - UntilTheRock Studio

## Installation en 5 minutes

### 1️⃣ Télécharger et Installer

```bash
# Se placer dans le dossier du projet
cd untiltherock/backend

# Installer les dépendances
npm install
```

### 2️⃣ Configurer

```bash
# Copier le fichier de configuration
cp .env.example .env

# Éditer la configuration (IMPORTANT: changer JWT_SECRET)
nano .env
```

### 3️⃣ Démarrer

```bash
# Lancer le serveur
npm start
```

**C'est tout ! 🎉**

Ouvrez votre navigateur sur: **http://localhost:3000**

---

## 🔑 Accès Admin

**URL:** http://localhost:3000/admin-login

**Identifiants par défaut:**
- Username: `admin`
- Password: `admin123`

⚠️ **Changez ces identifiants en production !**

---

## 📋 Checklist Avant Production

- [ ] Changer `JWT_SECRET` dans `.env`
- [ ] Changer le mot de passe admin
- [ ] Remplir les mentions légales avec vos vraies informations
- [ ] Configurer un nom de domaine
- [ ] Installer un certificat SSL (HTTPS)
- [ ] Configurer les backups de la base de données
- [ ] Tester tous les formulaires

---

## 🆘 Besoin d'aide ?

**Problème de démarrage ?**
```bash
# Vérifier que Node.js est installé
node --version  # Doit être >= 16.x

# Vérifier que le port 3000 est libre
netstat -an | grep 3000
```

**Erreur de base de données ?**
```bash
# Supprimer et recréer
rm untiltherock.db
npm start  # Recrée automatiquement
```

---

## 📖 Documentation Complète

Pour le déploiement sur VPS et la configuration avancée, consultez le fichier **README.md**

---

**Bon développement ! 🎸**