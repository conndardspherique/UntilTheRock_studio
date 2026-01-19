// Router simple pour SPA
const routes = {
  '/': homePage,
  '/portfolio': portfolioPage,  // Portfolio général
  '/portfolio/materiel': portfolioMaterielPage,  // Portfolio matériel
  '/portfolio/studio': portfolioStudioPage,  // Portfolio studio
  '/portfolio/mastering': portfolioMasteringPage,  // Portfolio mastering
  '/portfolio/enregistrement': portfolioRecordingPage,  // Portfolio enregistrement
  '/reservation-materiel': reservationMaterielPage,
  '/reservation-studio': reservationStudioPage,
  '/mastering': masteringPage,
  '/enregistrement': enregistrementPage,
  '/contact': contactPage,
  '/admin-login': adminLoginPage,
  '/admin-dashboard': adminDashboardPage,
  '/admin-portfolio': adminPortfolioPage,
  '/mentions-legales': mentionsLegalesPage,
  '/politique-confidentialite': politiqueConfidentialitePage,
  '/cgv': cgvPage
};

function navigateTo(path) {
  window.history.pushState({}, '', path);
  renderPage(path);
  updateActiveLink(path);
  window.scrollTo(0, 0);
  if (window.innerWidth <= 768) {
    document.querySelector('.nav-links').classList.remove('active');
  }
}

function renderPage(path) {
  const app = document.getElementById('app');
  const page = routes[path] || routes['/'];
  app.innerHTML = page();
}

function updateActiveLink(path) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
}

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// Effet scroll navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Navigation browser
window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
  updateActiveLink(window.location.pathname);
});

// Page d'accueil
function homePage() {
  return `
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>Bienvenue chez UntilTheRock</h1>
        <p>Votre studio d'enregistrement professionnel. Enregistrement, mastering, location de matériel - Tout pour votre projet musical.</p>
        <div class="cta-buttons">
          <button class="btn btn-primary" onclick="navigateTo('/reservation-studio')">Réserver un Studio</button>
          <button class="btn btn-outline" onclick="navigateTo('/contact')">Nous Contacter</button>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Nos Services</h2>
      <div class="services-grid">
        <div class="service-card" onclick="navigateTo('/reservation-materiel')">
          <div class="service-icon">🎸</div>
          <h3>Location de Matériel</h3>
          <p>Louez du matériel professionnel pour vos projets : micros, instruments, effets et plus encore.</p>
        </div>
        <div class="service-card" onclick="navigateTo('/reservation-studio')">
          <div class="service-icon">🎙️</div>
          <h3>Réservation Studio</h3>
          <p>Réservez nos studios d'enregistrement équipés du meilleur matériel audio.</p>
        </div>
        <div class="service-card" onclick="navigateTo('/mastering')">
          <div class="service-icon">🎚️</div>
          <h3>Mastering</h3>
          <p>Service de mastering professionnel pour sublimer vos productions.</p>
        </div>
        <div class="service-card" onclick="navigateTo('/enregistrement')">
          <div class="service-icon">🎵</div>
          <h3>Sessions d'Enregistrement</h3>
          <p>Enregistrez vos morceaux avec nos ingénieurs son expérimentés.</p>
        </div>
      </div>
    </section>
  `;
}

// Page Réservation Matériel
function reservationMaterielPage() {
  setTimeout(() => {
    document.getElementById('equipment-form')?.addEventListener('submit', handleEquipmentBooking);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Location de Matériel</h2>
      
      
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/materiel')">
          🖼️ Voir notre matériel en photos
        </button>
      </div>

      <div class="form-container">
        <form id="equipment-form">
          <div class="form-group">
            <label>Nom complet *</label>
            <input type="text" name="name" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Téléphone *</label>
            <input type="tel" name="phone" required>
          </div>
          <div class="form-group">
            <label>Matériel souhaité *</label>
            <select name="equipment" required>
              <option value="">Sélectionnez...</option>
              <option value="Micro Neumann U87">Micro Neumann U87</option>
              <option value="Guitare Fender Stratocaster">Guitare Fender Stratocaster</option>
              <option value="Batterie complète">Batterie complète</option>
              <option value="Pédale d'effet">Pédale d'effet</option>
              <option value="Ampli Marshall">Ampli Marshall</option>
              <option value="Synthétiseur">Synthétiseur</option>
              <option value="Table de mixage">Table de mixage</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date de début *</label>
            <input type="date" name="start_date" required>
          </div>
          <div class="form-group">
            <label>Date de fin *</label>
            <input type="date" name="end_date" required>
          </div>
          <div class="form-group">
            <label>Message / Précisions</label>
            <textarea name="message"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Réserver</button>
        </form>
      </div>
    </section>
  `;
}

// Page Réservation Studio
function reservationStudioPage() {
  setTimeout(() => {
    document.getElementById('studio-form')?.addEventListener('submit', handleStudioBooking);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Réservation Studio</h2>
      
      <!-- AJOUTEZ CE BLOC -->
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/studio')">
          🖼️ Voir notre studio en photos
        </button>
      </div>
      
      <div class="form-container">
        <form id="studio-form">
          <div class="form-group">
            <label>Nom complet *</label>
            <input type="text" name="name" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Téléphone *</label>
            <input type="tel" name="phone" required>
          </div>
          <div class="form-group">
            <label>Type de studio *</label>
            <select name="studio_type" required>
              <option value="">Sélectionnez...</option>
              <option value="Studio A - Grand format">Studio A - Grand format</option>
              <option value="Studio B - Enregistrement">Studio B - Enregistrement</option>
              <option value="Studio C - Mixage">Studio C - Mixage</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date *</label>
            <input type="date" name="date" required>
          </div>
          <div class="form-group">
            <label>Créneau horaire *</label>
            <select name="time_slot" required>
              <option value="">Sélectionnez...</option>
              <option value="09h00 - 12h00">09h00 - 12h00</option>
              <option value="12h00 - 15h00">12h00 - 15h00</option>
              <option value="15h00 - 18h00">15h00 - 18h00</option>
              <option value="18h00 - 21h00">18h00 - 21h00</option>
              <option value="21h00 - 00h00">21h00 - 00h00</option>
            </select>
          </div>
          <div class="form-group">
            <label>Durée (heures) *</label>
            <input type="number" name="duration" min="1" max="12" required>
          </div>
          <div class="form-group">
            <label>Message / Projet</label>
            <textarea name="message"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Réserver</button>
        </form>
      </div>
    </section>
  `;
}
// Page Mastering
function masteringPage() {
  setTimeout(() => {
    document.getElementById('mastering-form')?.addEventListener('submit', handleMasteringRequest);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Service de Mastering</h2>
      
      <!-- AJOUTEZ CE BLOC -->
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/mastering')">
          🖼️ Voir notre studio en photos
        </button>
      </div>

      <div class="form-container">
        <form id="mastering-form">
          <div class="form-group">
            <label>Nom complet *</label>
            <input type="text" name="name" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Téléphone *</label>
            <input type="tel" name="phone" required>
          </div>
          <div class="form-group">
            <label>Nombre de pistes *</label>
            <input type="number" name="track_count" min="1" required>
          </div>
          <div class="form-group">
            <label>Format souhaité *</label>
            <select name="format" required>
              <option value="">Sélectionnez...</option>
              <option value="WAV 24-bit">WAV 24-bit</option>
              <option value="WAV 16-bit">WAV 16-bit</option>
              <option value="MP3 320kbps">MP3 320kbps</option>
              <option value="FLAC">FLAC</option>
              <option value="Tous formats">Tous formats</option>
            </select>
          </div>
          <div class="form-group">
            <label>Description du projet</label>
            <textarea name="message" placeholder="Décrivez votre projet, style musical, références..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Demander un devis</button>
        </form>
      </div>
    </section>
  `;
}

// Page Enregistrement
function enregistrementPage() {
  setTimeout(() => {
    document.getElementById('recording-form')?.addEventListener('submit', handleRecordingSession);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Session d'Enregistrement</h2>
      
      <!-- AJOUTEZ CE BLOC -->
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/enregistrement')">
          🖼️ Voir notre studio en photos
        </button>
      </div>

      <div class="form-container">
        <form id="recording-form">
          <div class="form-group">
            <label>Nom complet *</label>
            <input type="text" name="name" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Téléphone *</label>
            <input type="tel" name="phone" required>
          </div>
          <div class="form-group">
            <label>Type de projet *</label>
            <select name="project_type" required>
              <option value="">Sélectionnez...</option>
              <option value="Single">Single</option>
              <option value="EP">EP</option>
              <option value="Album">Album</option>
              <option value="Démo">Démo</option>
              <option value="Voix-off">Voix-off</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date souhaitée *</label>
            <input type="date" name="date" required>
          </div>
          <div class="form-group">
            <label>Durée estimée (heures) *</label>
            <input type="number" name="duration" min="1" max="24" required>
          </div>
          <div class="form-group">
            <label>Détails du projet</label>
            <textarea name="message" placeholder="Décrivez votre projet, nombre de musiciens, style..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Réserver une session</button>
        </form>
      </div>
    </section>
  `;
}

// Page Contact
function contactPage() {
  setTimeout(() => {
    document.getElementById('contact-form')?.addEventListener('submit', handleContactForm);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Contactez-nous</h2>
      <div class="form-container">
        <form id="contact-form">
          <div class="form-group">
            <label>Nom complet *</label>
            <input type="text" name="name" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Sujet *</label>
            <input type="text" name="subject" required>
          </div>
          <div class="form-group">
            <label>Message *</label>
            <textarea name="message" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Envoyer</button>
        </form>
      </div>
    </section>
  `;
}



// Handlers de formulaires
async function handleEquipmentBooking(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await api.bookEquipment(data);
    alert('✅ Réservation enregistrée ! Nous vous contacterons sous 24h.');
    e.target.reset();
  } catch (error) {
    alert('❌ Erreur lors de la réservation. Veuillez réessayer.');
  }
}

async function handleStudioBooking(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await api.bookStudio(data);
    alert('✅ Réservation enregistrée ! Nous vous contacterons sous 24h.');
    e.target.reset();
  } catch (error) {
    alert('❌ Erreur lors de la réservation. Veuillez réessayer.');
  }
}

async function handleMasteringRequest(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await api.requestMastering(data);
    alert('✅ Demande enregistrée ! Nous vous enverrons un devis sous 48h.');
    e.target.reset();
  } catch (error) {
    alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
  }
}

async function handleRecordingSession(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await api.bookRecording(data);
    alert('✅ Session enregistrée ! Nous vous contacterons sous 24h.');
    e.target.reset();
  } catch (error) {
    alert('❌ Erreur lors de la réservation. Veuillez réessayer.');
  }
}

async function handleContactForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await api.sendContact(data);
    alert('✅ Message envoyé ! Nous vous répondrons rapidement.');
    e.target.reset();
  } catch (error) {
    alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
  }
}
// Pages légales
function mentionsLegalesPage() {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Mentions Légales</h2>
      <div class="form-container" style="max-width: 800px;">
        <h3 style="color: var(--primary); margin-bottom: 1rem;">Éditeur du site</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          UntilTheRock Studio<br>
          SIRET: [À REMPLIR]<br>
          Adresse: [À REMPLIR]<br>
          Téléphone: [À REMPLIR]<br>
          Email: contact@untiltherock.com
        </p>

        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Hébergement</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          Ce site est hébergé par [NOM HÉBERGEUR]<br>
          Adresse: [ADRESSE HÉBERGEUR]
        </p>

        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Propriété intellectuelle</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
        </p>
      </div>
    </section>
  `;
}

function politiqueConfidentialitePage() {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Politique de Confidentialité</h2>
      <div class="form-container" style="max-width: 800px;">
        <h3 style="color: var(--primary); margin-bottom: 1rem;">Collecte des données</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          Les données personnelles collectées via les formulaires de ce site sont utilisées uniquement pour traiter vos demandes de réservation et vous contacter. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.
        </p>

        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Utilisation des données</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          Vos données ne sont jamais vendues ou partagées avec des tiers. Elles sont stockées de manière sécurisée et conservées uniquement le temps nécessaire au traitement de votre demande.
        </p>

        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Contact</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          Pour toute question concernant vos données personnelles: contact@untiltherock.com
        </p>
      </div>
    </section>
  `;
}

function cgvPage() {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Conditions Générales de Vente</h2>
      <div class="form-container" style="max-width: 800px;">
        <h3 style="color: var(--primary); margin-bottom: 1rem;">Article 1 - Objet</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          Les présentes conditions générales de vente régissent les relations entre UntilTheRock Studio et ses clients pour les services de location de matériel, réservation de studio, mastering et enregistrement.
        </p>

        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Article 2 - Réservations</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          Toute réservation est confirmée après validation par UntilTheRock Studio. Un acompte peut être demandé pour confirmer la réservation.
        </p>

        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Article 3 - Tarifs</h3>
        <p style="color: var(--gray); line-height: 1.8;">
          Les tarifs sont indiqués en euros TTC. Ils sont susceptibles de modification à tout moment mais sont garantis pour toute réservation confirmée.
        </p>
      </div>
    </section>
  `;
}

// Page Login Admin
function adminLoginPage() {
  setTimeout(() => {
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Connexion Admin</h2>
      <div class="form-container">
        <form id="login-form">
          <div class="form-group">
            <label>Nom d'utilisateur</label>
            <input type="text" name="username" required>
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" name="password" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Se connecter</button>
        </form>
      </div>
    </section>
  `;
}

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await api.login(data);
    localStorage.setItem('admin_token', result.token);
    navigateTo('/admin-dashboard');
  } catch (error) {
    alert('❌ Identifiants incorrects');
  }
}

function adminDashboardPage() {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    navigateTo('/admin-login');
    return '';
  }

  setTimeout(loadAdminData, 0);

return `
  <section class="section" style="padding-top: 120px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h2 class="section-title" style="margin: 0;">Dashboard Admin</h2>
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-primary" onclick="navigateTo('/admin-portfolio')">🖼️ Portfolio</button>
        <button class="btn btn-outline" onclick="handleLogout()">Déconnexion</button>
      </div>
    </div>
    <div id="admin-content">
      <p style="text-align: center; color: var(--gray);">Chargement...</p>
    </div>
  </section>
`;
}

async function loadAdminData() {
  try {
    const bookings = await api.getAllBookings();
    const contacts = await api.getContacts();
    
    const content = `
      <div style="display: grid; gap: 2rem;">
        <div class="service-card">
          <h3>Réservations Matériel (${bookings.equipment?.length || 0})</h3>
          ${renderBookingsList(bookings.equipment || [], 'equipment')}
        </div>
        <div class="service-card">
          <h3>Réservations Studio (${bookings.studio?.length || 0})</h3>
          ${renderBookingsList(bookings.studio || [], 'studio')}
        </div>
        <div class="service-card">
          <h3>Demandes Mastering (${bookings.mastering?.length || 0})</h3>
          ${renderBookingsList(bookings.mastering || [], 'mastering')}
        </div>
        <div class="service-card">
          <h3>Sessions Enregistrement (${bookings.recording?.length || 0})</h3>
          ${renderBookingsList(bookings.recording || [], 'recording')}
        </div>
        <div class="service-card">
          <h3>Messages de Contact (${contacts?.length || 0})</h3>
          ${renderContactsList(contacts || [])}
        </div>
      </div>
    `;
    
    document.getElementById('admin-content').innerHTML = content;
  } catch (error) {
    document.getElementById('admin-content').innerHTML = '<p style="color: var(--primary);">Erreur de chargement</p>';
  }
}

// REMPLACEZ la fonction renderBookingsList dans main.js par celle-ci

function renderBookingsList(bookings, type) {
  if (!bookings || bookings.length === 0) {
    return '<p style="color: var(--gray);">Aucune réservation</p>';
  }
  
  return bookings.map(b => `
    <div style="padding: 1.5rem; background: var(--dark); border-radius: 10px; margin-top: 1rem; border-left: 4px solid ${getStatusColor(b.status)};">
      <!-- En-tête -->
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <div>
          <p style="font-size: 1.1rem; font-weight: 600;"><strong>${b.name}</strong></p>
          <p style="color: var(--gray); font-size: 0.9rem; margin-top: 0.25rem;">
            📧 ${b.email} | 📞 ${b.phone}
          </p>
        </div>
        <span style="display: inline-block; padding: 0.5rem 1rem; background: ${getStatusColor(b.status)}; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
          ${getStatusLabel(b.status)}
        </span>
      </div>

      <!-- Détails selon le type -->
      <div style="background: var(--dark-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        ${renderBookingDetails(b, type)}
      </div>

      <!-- Message -->
      ${b.message ? `
        <div style="padding: 1rem; background: var(--dark-secondary); border-radius: 8px; margin-bottom: 1rem;">
          <p style="color: var(--gray); font-size: 0.9rem; font-style: italic;">"${b.message}"</p>
        </div>
      ` : ''}

      <!-- Date de création -->
      <p style="color: var(--gray); font-size: 0.85rem; margin-bottom: 1rem;">
        📅 Reçu le ${new Date(b.created_at).toLocaleString('fr-FR')}
      </p>

      <!-- Actions -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        ${b.status === 'pending' ? `
          <button 
            onclick="updateBookingStatus(${b.id}, '${type}', 'confirmed')"
            class="btn btn-primary"
            style="padding: 0.5rem 1rem; font-size: 0.9rem;"
          >
            ✅ Confirmer
          </button>
        ` : ''}
        
        ${b.status === 'confirmed' ? `
          <button 
            onclick="updateBookingStatus(${b.id}, '${type}', 'completed')"
            class="btn btn-outline"
            style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: var(--success); color: var(--success);"
          >
            ✓ Marquer comme terminé
          </button>
        ` : ''}
        
        ${b.status !== 'cancelled' ? `
          <button 
            onclick="updateBookingStatus(${b.id}, '${type}', 'cancelled')"
            class="btn btn-outline"
            style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: var(--primary); color: var(--primary);"
          >
            ❌ Annuler
          </button>
        ` : ''}
        
        <button 
          onclick="window.open('mailto:${b.email}?subject=Votre réservation UntilTheRock', '_blank')"
          class="btn btn-outline"
          style="padding: 0.5rem 1rem; font-size: 0.9rem;"
        >
          📧 Envoyer un email
        </button>
        
        <button 
          onclick="deleteBooking(${b.id}, '${type}')"
          class="btn btn-outline"
          style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: #666; color: #666;"
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  `).join('');
}

// Afficher les détails selon le type de réservation
function renderBookingDetails(booking, type) {
  switch(type) {
    case 'equipment':
      return `
        <p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎸 Matériel:</strong> ${booking.equipment}</p>
        <p style="color: var(--gray); font-size: 0.9rem;">📅 Du ${new Date(booking.start_date).toLocaleDateString('fr-FR')} au ${new Date(booking.end_date).toLocaleDateString('fr-FR')}</p>
      `;
    
    case 'studio':
      return `
        <p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎙️ Studio:</strong> ${booking.studio_type}</p>
        <p style="color: var(--gray); font-size: 0.9rem;">📅 ${new Date(booking.date).toLocaleDateString('fr-FR')}</p>
        <p style="color: var(--gray); font-size: 0.9rem;">🕐 ${booking.time_slot} (${booking.duration}h)</p>
      `;
    
    case 'mastering':
      return `
        <p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎚️ Mastering:</strong> ${booking.track_count} piste(s)</p>
        <p style="color: var(--gray); font-size: 0.9rem;">📀 Format: ${booking.format}</p>
      `;
    
    case 'recording':
      return `
        <p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎵 Projet:</strong> ${booking.project_type}</p>
        <p style="color: var(--gray); font-size: 0.9rem;">📅 ${new Date(booking.date).toLocaleDateString('fr-FR')}</p>
        <p style="color: var(--gray); font-size: 0.9rem;">⏱️ Durée estimée: ${booking.duration}h</p>
      `;
    
    default:
      return '';
  }
}

// Couleurs selon le statut
function getStatusColor(status) {
  const colors = {
    pending: '#ff9800',    // Orange
    confirmed: '#2196f3',  // Bleu
    completed: '#4caf50',  // Vert
    cancelled: '#f44336'   // Rouge
  };
  return colors[status] || '#666';
}

// Labels selon le statut
function getStatusLabel(status) {
  const labels = {
    pending: '⏳ En attente',
    confirmed: '✅ Confirmé',
    completed: '✓ Terminé',
    cancelled: '❌ Annulé'
  };
  return labels[status] || status;
}

// Mettre à jour le statut d'une réservation
async function updateBookingStatus(id, type, newStatus) {
  const confirmMessages = {
    confirmed: 'Confirmer cette réservation ?',
    completed: 'Marquer comme terminée ?',
    cancelled: 'Annuler cette réservation ?'
  };
  
  if (!confirm(confirmMessages[newStatus])) {
    return;
  }
  
  try {
    await api.updateBookingStatus(type, id, newStatus);
    alert(`✅ Statut mis à jour: ${getStatusLabel(newStatus)}`);
    loadAdminData(); // Recharger les données
  } catch (error) {
    alert('❌ Erreur lors de la mise à jour');
  }
}

// Supprimer une réservation
async function deleteBooking(id, type) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement cette réservation ?\n\n⚠️ Cette action est irréversible.')) {
    return;
  }
  
  try {
    await api.deleteBooking(type, id);
    alert('✅ Réservation supprimée !');
    loadAdminData(); // Recharger les données
  } catch (error) {
    console.error('Erreur suppression:', error);
    alert('❌ Erreur lors de la suppression');
  }
}



function renderContactsList(contacts) {
  if (!contacts || contacts.length === 0) {
    return '<p style="color: var(--gray);">Aucun message</p>';
  }
  
  return contacts.map(c => `
    <div style="padding: 1.5rem; background: var(--dark); border-radius: 10px; margin-top: 1rem; border-left: 4px solid ${c.status === 'unread' ? '#ff9800' : '#4caf50'};">
      <!-- En-tête -->
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <div>
          <p style="font-size: 1.1rem; font-weight: 600;"><strong>${c.name}</strong></p>
          <p style="color: var(--gray); font-size: 0.9rem; margin-top: 0.25rem;">📧 ${c.email}</p>
        </div>
        <span style="display: inline-block; padding: 0.5rem 1rem; background: ${c.status === 'unread' ? '#ff9800' : '#4caf50'}; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
          ${c.status === 'unread' ? '📬 Non lu' : '✓ Lu'}
        </span>
      </div>

      <!-- Sujet -->
      <p style="color: var(--primary); font-weight: 600; margin-bottom: 0.75rem;">
        Sujet: ${c.subject}
      </p>

      <!-- Message -->
      <div style="padding: 1rem; background: var(--dark-secondary); border-radius: 8px; margin-bottom: 1rem;">
        <p style="color: var(--gray); line-height: 1.6;">${c.message}</p>
      </div>

      <!-- Date -->
      <p style="color: var(--gray); font-size: 0.85rem; margin-bottom: 1rem;">
        📅 Reçu le ${new Date(c.created_at).toLocaleString('fr-FR')}
      </p>

      <!-- Actions -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        ${c.status === 'unread' ? `
          <button 
            onclick="markContactAsRead(${c.id})"
            class="btn btn-primary"
            style="padding: 0.5rem 1rem; font-size: 0.9rem;"
          >
            ✓ Marquer comme lu
          </button>
        ` : ''}
        
        <button 
          onclick="window.open('mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}', '_blank')"
          class="btn btn-outline"
          style="padding: 0.5rem 1rem; font-size: 0.9rem;"
        >
          📧 Répondre
        </button>
      </div>
    </div>
  `).join('');
}

// Marquer un message comme lu
async function markContactAsRead(id) {
  try {
    await api.updateContactStatus(id, 'read');
    alert('✅ Message marqué comme lu');
    loadAdminData();
  } catch (error) {
    alert('❌ Erreur lors de la mise à jour');
  }
}

function renderContactsList(contacts) {
  if (!contacts || contacts.length === 0) {
    return '<p style="color: var(--gray);">Aucun message</p>';
  }
  
  return contacts.slice(0, 5).map(c => `
    <div style="padding: 1rem; background: var(--dark); border-radius: 10px; margin-top: 1rem;">
      <p><strong>${c.name}</strong> - ${c.subject}</p>
      <p style="color: var(--gray); font-size: 0.9rem;">${c.message.substring(0, 100)}...</p>
      <p style="color: var(--gray); font-size: 0.85rem; margin-top: 0.5rem;">${new Date(c.created_at).toLocaleString('fr-FR')}</p>
    </div>
  `).join('');
}

function handleLogout() {
  localStorage.removeItem('admin_token');
  navigateTo('/admin-login');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  renderPage(window.location.pathname);
  updateActiveLink(window.location.pathname);
});

// AJOUTEZ CES FONCTIONS À LA FIN DE VOTRE main.js

// Page admin portfolio
function adminPortfolioPage() {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    navigateTo('/admin-login');
    return '';
  }

  setTimeout(() => {
    loadAdminPortfolio();
    document.getElementById('portfolio-add-form')?.addEventListener('submit', handleAddPortfolioWithFiles);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 class="section-title" style="margin: 0;">🖼️ Gestion Portfolio</h2>
        <button class="btn btn-outline" onclick="navigateTo('/admin-dashboard')">← Retour Dashboard</button>
      </div>

      <!-- Formulaire d'ajout -->
      <div class="form-container" style="margin-bottom: 3rem;">
        <h3 style="color: var(--primary); margin-bottom: 1.5rem;">➕ Ajouter un Élément</h3>
        <form id="portfolio-add-form" enctype="multipart/form-data">
          <div class="form-group">
            <label>Type de service *</label>
            <select name="service_type" required>
              <option value="mastering">Mastering</option>
              <option value="recording">Enregistrement</option>
              <option value="studio">Réservation Studio</option>
              <option value="equipment">Location de Matériel</option>
            </select>
          </div>

          <div class="form-group">
            <label>Titre *</label>
            <input type="text" name="title" required placeholder="Ex: Projet Rock 2025">
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Décrivez le projet..." rows="3"></textarea>
          </div>

          <!-- Upload Image -->
          <div class="form-group">
            <label>📷 Image</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                name="image" 
                id="image-upload" 
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onchange="previewFile(this, 'image-preview')"
              >
              <label for="image-upload" class="file-upload-label">
                📁 Choisir une image
              </label>
              <div id="image-preview" class="file-preview"></div>
            </div>
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">
              Formats acceptés: JPG, PNG, GIF, WEBP - Max 100MB
            </small>
          </div>

          <!-- Upload Audio -->
          <div class="form-group">
            <label>🎵 Audio</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                name="audio" 
                id="audio-upload" 
                accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg"
                onchange="previewFile(this, 'audio-preview')"
              >
              <label for="audio-upload" class="file-upload-label">
                📁 Choisir un fichier audio
              </label>
              <div id="audio-preview" class="file-preview"></div>
            </div>
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">
              Formats acceptés: MP3, WAV, OGG - Max 100MB
            </small>
          </div>

          <!-- Upload Video -->
          <div class="form-group">
            <label>🎬 Vidéo</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                name="video" 
                id="video-upload" 
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                onchange="previewFile(this, 'video-preview')"
              >
              <label for="video-upload" class="file-upload-label">
                📁 Choisir une vidéo
              </label>
              <div id="video-preview" class="file-preview"></div>
            </div>
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">
              Formats acceptés: MP4, WEBM, OGG - Max 100MB
            </small>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;" id="submit-btn">
            ➕ Ajouter au Portfolio
          </button>
          
          <div id="upload-progress" style="display: none; margin-top: 1rem;">
            <div style="background: var(--dark); border-radius: 10px; height: 30px; overflow: hidden;">
              <div id="progress-bar" style="background: linear-gradient(90deg, var(--primary), var(--secondary)); height: 100%; width: 0%; transition: width 0.3s ease; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;"></div>
            </div>
          </div>
        </form>
      </div>

      <!-- Liste des éléments existants -->
      <div class="form-container" style="max-width: 100%;">
        <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📋 Éléments Existants</h3>
        <div id="admin-portfolio-list">
          <p style="text-align: center; color: var(--gray);">Chargement...</p>
        </div>
      </div>
    </section>
  `;
}

// Prévisualiser les fichiers sélectionnés
function previewFile(input, previewId) {
  const preview = document.getElementById(previewId);
  const file = input.files[0];
  
  if (!file) {
    preview.innerHTML = '';
    return;
  }

  const fileSize = (file.size / (1024 * 1024)).toFixed(2); // MB
  const fileName = file.name;

  if (input.accept.includes('image')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `
        <div style="margin-top: 1rem;">
          <img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 10px; object-fit: cover;">
          <p style="color: var(--gray); font-size: 0.9rem; margin-top: 0.5rem;">${fileName} (${fileSize} MB)</p>
        </div>
      `;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = `
      <div style="margin-top: 1rem; padding: 1rem; background: var(--dark); border-radius: 10px;">
        <p style="color: var(--success);">✅ ${fileName}</p>
        <p style="color: var(--gray); font-size: 0.9rem;">${fileSize} MB</p>
      </div>
    `;
  }
}

// Ajouter un élément avec fichiers
async function handleAddPortfolioWithFiles(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const progressContainer = document.getElementById('upload-progress');
  const progressBar = document.getElementById('progress-bar');
  
  submitBtn.disabled = true;
  submitBtn.textContent = '⏳ Upload en cours...';
  progressContainer.style.display = 'block';
  
  const formData = new FormData(e.target);
  const token = localStorage.getItem('admin_token');

  try {
    // Créer une requête avec suivi de progression
    const xhr = new XMLHttpRequest();
    
    // Suivre la progression
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        progressBar.style.width = percentComplete + '%';
        progressBar.textContent = percentComplete + '%';
      }
    });

    // Promise pour gérer la requête
    const uploadPromise = new Promise((resolve, reject) => {
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Erreur ${xhr.status}`));
        }
      });
      
      xhr.addEventListener('error', () => reject(new Error('Erreur réseau')));
      xhr.addEventListener('abort', () => reject(new Error('Upload annulé')));
    });

    xhr.open('POST', '/api/portfolio');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(formData);

    await uploadPromise;
    
    alert('✅ Élément ajouté au portfolio !');
    e.target.reset();
    
    // Nettoyer les previews
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('audio-preview').innerHTML = '';
    document.getElementById('video-preview').innerHTML = '';
    
    loadAdminPortfolio(); // Recharger la liste
    
  } catch (error) {
    console.error('Erreur upload:', error);
    alert('❌ Erreur lors de l\'upload. Vérifiez la taille des fichiers (max 100MB).');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '➕ Ajouter au Portfolio';
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
  }
}

// Charger le portfolio pour l'admin
async function loadAdminPortfolio() {
  try {
    const items = await api.getPortfolio();
    renderAdminPortfolio(items);
  } catch (error) {
    document.getElementById('admin-portfolio-list').innerHTML = 
      '<p style="color: var(--primary);">Erreur de chargement</p>';
  }
}

// Afficher le portfolio dans l'admin
function renderAdminPortfolio(items) {
  const list = document.getElementById('admin-portfolio-list');
  
  if (items.length === 0) {
    list.innerHTML = '<p style="text-align: center; color: var(--gray);">Aucun élément dans le portfolio</p>';
    return;
  }

  list.innerHTML = `
    <div style="display: grid; gap: 2rem;">
      ${items.map(item => `
        <div class="service-card" style="position: relative;">
          <div style="display: grid; grid-template-columns: 200px 1fr; gap: 2rem; align-items: start;">
            
            <!-- Miniatures -->
            <div>
              ${item.image_url ? `
                <div style="position: relative;">
                  <img 
                    src="${item.image_url}" 
                    alt="${item.title}"
                    style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;"
                    onclick="window.open('${item.image_url}', '_blank')"
                  />
                  <button 
                    onclick="deletePortfolioFile(${item.id}, 'image')"
                    style="position: absolute; top: 5px; right: 5px; background: rgba(255,51,102,0.9); border: none; color: white; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;"
                    title="Supprimer l'image"
                  >×</button>
                </div>
              ` : '<div style="width: 100%; height: 150px; background: var(--dark); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--gray);">Pas d\'image</div>'}
              
              <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                ${item.audio_url ? `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem; background: var(--dark); border-radius: 5px;">
                    <span style="color: var(--success); font-size: 0.9rem;">🎵 Audio</span>
                    <button 
                      onclick="deletePortfolioFile(${item.id}, 'audio')"
                      style="background: transparent; border: none; color: var(--primary); cursor: pointer; font-size: 1.2rem;"
                      title="Supprimer l'audio"
                    >×</button>
                  </div>
                ` : ''}
                
                ${item.video_url ? `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem; background: var(--dark); border-radius: 5px;">
                    <span style="color: var(--success); font-size: 0.9rem;">🎬 Vidéo</span>
                    <button 
                      onclick="deletePortfolioFile(${item.id}, 'video')"
                      style="background: transparent; border: none; color: var(--primary); cursor: pointer; font-size: 1.2rem;"
                      title="Supprimer la vidéo"
                    >×</button>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Informations -->
            <div>
              <h4 style="color: var(--primary); margin-bottom: 0.5rem; font-size: 1.3rem;">${item.title}</h4>
              <span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--secondary); border-radius: 20px; font-size: 0.85rem; margin-bottom: 1rem;">
                ${item.service_type}
              </span>
              <p style="color: var(--gray); line-height: 1.6; margin-bottom: 1rem;">
                ${item.description || '<em>Pas de description</em>'}
              </p>
              <p style="color: var(--gray); font-size: 0.85rem;">
                📅 Ajouté le ${new Date(item.created_at).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              
              <!-- Actions -->
              <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <button 
                  class="btn btn-outline" 
                  onclick="deletePortfolioItem(${item.id}, '${item.title}')"
                  style="padding: 0.75rem 1.5rem; border-color: var(--primary); color: var(--primary);"
                >
                  🗑️ Supprimer l'élément
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Supprimer un fichier spécifique
async function deletePortfolioFile(id, type) {
  const typeLabels = {
    image: 'l\'image',
    audio: 'l\'audio',
    video: 'la vidéo'
  };
  
  if (!confirm(`Êtes-vous sûr de vouloir supprimer ${typeLabels[type]} ?`)) {
    return;
  }
  
  try {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`/api/portfolio/${id}/file/${type}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Erreur suppression');
    
    alert(`✅ ${typeLabels[type].charAt(0).toUpperCase() + typeLabels[type].slice(1)} supprimé(e) !`);
    loadAdminPortfolio();
  } catch (error) {
    alert('❌ Erreur lors de la suppression.');
  }
}

// Supprimer un élément complet
async function deletePortfolioItem(id, title) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer l'élément "${title}" ?\n\nCette action supprimera tous les fichiers associés et est irréversible.`)) {
    return;
  }
  
  try {
    await api.deletePortfolioItem(id);
    alert('✅ Élément supprimé !');
    loadAdminPortfolio();
  } catch (error) {
    alert('❌ Erreur lors de la suppression.');
  }
}

// AJOUTEZ CES FONCTIONS dans main.js

// Portfolio général (toutes les catégories)
function portfolioPage() {
  setTimeout(() => loadPortfolioItems('all'), 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Notre Portfolio</h2>
      
      <!-- Filtres -->
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline filter-btn active" onclick="filterPortfolio('all')" data-filter="all" style="margin: 0.5rem;">Tout</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('equipment')" data-filter="equipment" style="margin: 0.5rem;">Matériel</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('studio')" data-filter="studio" style="margin: 0.5rem;">Studio</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('mastering')" data-filter="mastering" style="margin: 0.5rem;">Mastering</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('recording')" data-filter="recording" style="margin: 0.5rem;">Enregistrement</button>
      </div>

      <!-- Grille Portfolio -->
      <div id="portfolio-grid" class="services-grid">
        <p style="text-align: center; color: var(--gray);">Chargement...</p>
      </div>
    </section>
  `;
}

// Portfolio Matériel
function portfolioMaterielPage() {
  setTimeout(() => loadPortfolioItems('equipment'), 0);
  return renderPortfolioTemplate('equipment', '🎸 Portfolio Matériel', 'Découvrez notre matériel en action');
}

// Portfolio Studio
function portfolioStudioPage() {
  setTimeout(() => loadPortfolioItems('studio'), 0);
  return renderPortfolioTemplate('studio', '🎙️ Portfolio Studio', 'Nos studios d\'enregistrement');
}

// Portfolio Mastering
function portfolioMasteringPage() {
  setTimeout(() => loadPortfolioItems('mastering'), 0);
  return renderPortfolioTemplate('mastering', '🎚️ Portfolio Mastering', 'Nos réalisations de mastering');
}

// Portfolio Enregistrement
function portfolioRecordingPage() {
  setTimeout(() => loadPortfolioItems('recording'), 0);
  return renderPortfolioTemplate('recording', '🎵 Portfolio Enregistrement', 'Nos sessions d\'enregistrement');
}

// Template de page portfolio
function renderPortfolioTemplate(serviceType, title, subtitle) {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">${title}</h2>
      <p style="text-align: center; color: var(--gray); font-size: 1.2rem; margin-bottom: 3rem;">${subtitle}</p>
      
      <!-- Grille Portfolio -->
      <div id="portfolio-grid" class="services-grid">
        <p style="text-align: center; color: var(--gray);">Chargement...</p>
      </div>

      <!-- Bouton retour -->
      <div style="text-align: center; margin-top: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio')">
          ← Voir tout le portfolio
        </button>
      </div>
    </section>
  `;
}

// Charger les éléments du portfolio
async function loadPortfolioItems(filter = 'all') {
  try {
    const items = await api.getPortfolio(filter === 'all' ? null : filter);
    renderPublicPortfolio(items);
  } catch (error) {
    document.getElementById('portfolio-grid').innerHTML = 
      '<p style="color: var(--primary);">Erreur de chargement</p>';
  }
}

// Afficher le portfolio public
function renderPublicPortfolio(items) {
  const grid = document.getElementById('portfolio-grid');
  
  if (items.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎵</div>
        <p style="color: var(--gray); font-size: 1.2rem;">Aucune réalisation pour le moment</p>
        <p style="color: var(--gray); margin-top: 1rem;">Revenez bientôt pour découvrir nos projets !</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="service-card portfolio-item" data-type="${item.service_type}" style="cursor: pointer; overflow: hidden;">
      <!-- Image -->
      ${item.image_url ? `
        <div style="position: relative; overflow: hidden; border-radius: 10px; margin-bottom: 1rem; height: 250px;">
          <img 
            src="${item.image_url}" 
            alt="${item.title}"
            style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
            onmouseover="this.style.transform='scale(1.1)'"
            onmouseout="this.style.transform='scale(1)'"
          />
          <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem;">
            ${getServiceIcon(item.service_type)} ${getServiceLabel(item.service_type)}
          </div>
        </div>
      ` : `
        <div style="width: 100%; height: 250px; background: linear-gradient(135deg, var(--dark-secondary), var(--dark)); border-radius: 10px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
          ${getServiceIcon(item.service_type)}
        </div>
      `}

      <!-- Titre -->
      <h3 style="color: var(--primary); margin-bottom: 0.5rem; font-size: 1.3rem;">${item.title}</h3>

      <!-- Description -->
      <p style="color: var(--gray); margin-bottom: 1rem; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
        ${item.description || 'Découvrez ce projet...'}
      </p>

      <!-- Badges médias -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
        ${item.image_url ? '<span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--secondary); border-radius: 15px; font-size: 0.75rem;">📷 Image</span>' : ''}
        ${item.audio_url ? '<span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--secondary); border-radius: 15px; font-size: 0.75rem;">🎵 Audio</span>' : ''}
        ${item.video_url ? '<span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--secondary); border-radius: 15px; font-size: 0.75rem;">🎬 Vidéo</span>' : ''}
      </div>

      <!-- Bouton voir plus -->
      <button 
        class="btn btn-primary" 
        style="width: 100%; margin-top: auto;"
        onclick="openPortfolioModal(${item.id})"
      >
        👁️ Voir le projet
      </button>
    </div>
  `).join('');
}

// Icônes par service
function getServiceIcon(type) {
  const icons = {
    equipment: '🎸',
    studio: '🎙️',
    mastering: '🎚️',
    recording: '🎵'
  };
  return icons[type] || '🎵';
}

// Labels par service
function getServiceLabel(type) {
  const labels = {
    equipment: 'Matériel',
    studio: 'Studio',
    mastering: 'Mastering',
    recording: 'Enregistrement'
  };
  return labels[type] || type;
}

// Filtrer le portfolio
function filterPortfolio(type) {
  loadPortfolioItems(type);
  
  // Mettre à jour les boutons actifs
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-filter') === type) {
      btn.classList.add('active');
    }
  });
}

// Ouvrir le modal d'un projet
async function openPortfolioModal(itemId) {
  try {
    const items = await api.getPortfolio();
    const item = items.find(i => i.id === itemId);
    
    if (!item) {
      alert('Projet non trouvé');
      return;
    }

    const modalHTML = `
      <div id="portfolio-modal" class="modal" style="display: flex;" onclick="closePortfolioModal(event)">
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation()">
          <span class="modal-close" onclick="closePortfolioModal()">&times;</span>
          
          <div style="padding: 2rem;">
            <!-- En-tête -->
            <div style="margin-bottom: 2rem;">
              <span style="display: inline-block; padding: 0.5rem 1rem; background: var(--secondary); border-radius: 20px; font-size: 0.9rem; margin-bottom: 1rem;">
                ${getServiceIcon(item.service_type)} ${getServiceLabel(item.service_type)}
              </span>
              <h2 style="color: var(--primary); font-size: 2rem; margin-bottom: 0.5rem;">${item.title}</h2>
              <p style="color: var(--gray); line-height: 1.8; font-size: 1.1rem;">
                ${item.description || ''}
              </p>
            </div>

            <!-- Image -->
            ${item.image_url ? `
              <div style="margin-bottom: 2rem;">
                <img 
                  src="${item.image_url}" 
                  alt="${item.title}"
                  style="width: 100%; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);"
                />
              </div>
            ` : ''}

            <!-- Audio -->
            ${item.audio_url ? `
              <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--primary); margin-bottom: 1rem;">🎵 Extrait Audio</h3>
                <audio controls style="width: 100%; border-radius: 10px;" preload="metadata">
                  <source src="${item.audio_url}" type="audio/mpeg">
                  <source src="${item.audio_url}" type="audio/wav">
                  <source src="${item.audio_url}" type="audio/ogg">
                  Votre navigateur ne supporte pas l'audio.
                </audio>
              </div>
            ` : ''}

            <!-- Vidéo -->
            ${item.video_url ? `
              <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--primary); margin-bottom: 1rem;">🎬 Vidéo</h3>
                <video 
                  controls 
                  style="width: 100%; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);"
                  preload="metadata"
                >
                  <source src="${item.video_url}" type="video/mp4">
                  <source src="${item.video_url}" type="video/webm">
                  <source src="${item.video_url}" type="video/ogg">
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              </div>
            ` : ''}

            <!-- Boutons d'action -->
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
              <button class="btn btn-primary" onclick="navigateTo('/contact')">
                📧 Nous contacter pour un projet similaire
              </button>
              <button class="btn btn-outline" onclick="closePortfolioModal()">
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  } catch (error) {
    console.error('Erreur chargement projet:', error);
    alert('Erreur lors du chargement du projet');
  }
}

// Fermer le modal portfolio
function closePortfolioModal(event) {
  if (event && event.target.classList.contains('modal-content')) {
    return; // Ne pas fermer si on clique sur le contenu
  }
  
  const modal = document.getElementById('portfolio-modal');
  if (modal) {
    // Arrêter toutes les vidéos et audios
    modal.querySelectorAll('video, audio').forEach(media => {
      media.pause();
    });
    modal.remove();
  }
}