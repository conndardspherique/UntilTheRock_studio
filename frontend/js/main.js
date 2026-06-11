// ============================================================
// ROUTER
// ============================================================
const routes = {
  '/': homePage,
  '/portfolio': portfolioPage,
  '/portfolio/materiel': portfolioMaterielPage,
  '/portfolio/studio': portfolioStudioPage,
  '/portfolio/mastering': portfolioMasteringPage,
  '/portfolio/enregistrement': portfolioRecordingPage,
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
    if (link.getAttribute('href') === path) link.classList.add('active');
  });
}

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
  updateActiveLink(window.location.pathname);
});

document.addEventListener('DOMContentLoaded', () => {
  renderPage(window.location.pathname);
  updateActiveLink(window.location.pathname);
});

// ============================================================
// PAGES PUBLIQUES
// ============================================================
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
          <div class="service-icon">1</div>
          <h3>Location de Matériel</h3>
          <p>Louez du matériel professionnel pour vos projets : micros, instruments, effets et plus encore.</p>
        </div>
        <div class="service-card" onclick="navigateTo('/reservation-studio')">
          <div class="service-icon">2</div>
          <h3>Réservation Studio</h3>
          <p>Réservez nos studios d'enregistrement équipés du meilleur matériel audio.</p>
        </div>
        <div class="service-card" onclick="navigateTo('/mastering')">
          <div class="service-icon">3</div>
          <h3>Mastering</h3>
          <p>Service de mastering professionnel pour sublimer vos productions.</p>
        </div>
        <div class="service-card" onclick="navigateTo('/enregistrement')">
          <div class="service-icon">4</div>
          <h3>Sessions d'Enregistrement</h3>
          <p>Enregistrez vos morceaux avec nos ingénieurs son expérimentés.</p>
        </div>
      </div>
    </section>
  `;
}

function reservationMaterielPage() {
  setTimeout(() => {
    document.getElementById('equipment-form')?.addEventListener('submit', handleEquipmentBooking);
  }, 0);
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Location de Matériel</h2>
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/materiel')">🖼️ Voir notre matériel en photos</button>
      </div>
      <div class="form-container">
        <form id="equipment-form">
          <div class="form-group"><label>Nom complet *</label><input type="text" name="name" required></div>
          <div class="form-group"><label>Email *</label><input type="email" name="email" required></div>
          <div class="form-group"><label>Téléphone *</label><input type="tel" name="phone" required></div>
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
          <div class="form-group"><label>Date de début *</label><input type="date" name="start_date" required></div>
          <div class="form-group"><label>Date de fin *</label><input type="date" name="end_date" required></div>
          <div class="form-group"><label>Message / Précisions</label><textarea name="message"></textarea></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Réserver</button>
        </form>
      </div>
    </section>
  `;
}

function reservationStudioPage() {
  setTimeout(() => {
    document.getElementById('studio-form')?.addEventListener('submit', handleStudioBooking);
  }, 0);
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Réservation Studio</h2>
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/studio')">🖼️ Voir notre studio en photos</button>
      </div>
      <div class="form-container">
        <form id="studio-form">
          <div class="form-group"><label>Nom complet *</label><input type="text" name="name" required></div>
          <div class="form-group"><label>Email *</label><input type="email" name="email" required></div>
          <div class="form-group"><label>Téléphone *</label><input type="tel" name="phone" required></div>
          <div class="form-group">
            <label>Type de studio *</label>
            <select name="studio_type" required>
              <option value="">Sélectionnez...</option>
              <option value="Studio A - Grand format">Studio A - Grand format</option>
              <option value="Studio B - Enregistrement">Studio B - Enregistrement</option>
              <option value="Studio C - Mixage">Studio C - Mixage</option>
            </select>
          </div>
          <div class="form-group"><label>Date *</label><input type="date" name="date" required></div>
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
          <div class="form-group"><label>Durée (heures) *</label><input type="number" name="duration" min="1" max="12" required></div>
          <div class="form-group"><label>Message / Projet</label><textarea name="message"></textarea></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Réserver</button>
        </form>
      </div>
    </section>
  `;
}

function masteringPage() {
  setTimeout(() => {
    document.getElementById('mastering-form')?.addEventListener('submit', handleMasteringRequest);
  }, 0);
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Service de Mastering</h2>
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/mastering')">🖼️ Voir nos réalisations mastering</button>
      </div>
      <div class="form-container">
        <form id="mastering-form">
          <div class="form-group"><label>Nom complet *</label><input type="text" name="name" required></div>
          <div class="form-group"><label>Email *</label><input type="email" name="email" required></div>
          <div class="form-group"><label>Téléphone *</label><input type="tel" name="phone" required></div>
          <div class="form-group"><label>Nombre de pistes *</label><input type="number" name="track_count" min="1" required></div>
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
          <div class="form-group"><label>Description du projet</label><textarea name="message" placeholder="Décrivez votre projet, style musical, références..."></textarea></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Demander un devis</button>
        </form>
      </div>
    </section>
  `;
}

function enregistrementPage() {
  setTimeout(() => {
    document.getElementById('recording-form')?.addEventListener('submit', handleRecordingSession);
  }, 0);
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Session d'Enregistrement</h2>
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio/enregistrement')">🖼️ Voir nos sessions en photos</button>
      </div>
      <div class="form-container">
        <form id="recording-form">
          <div class="form-group"><label>Nom complet *</label><input type="text" name="name" required></div>
          <div class="form-group"><label>Email *</label><input type="email" name="email" required></div>
          <div class="form-group"><label>Téléphone *</label><input type="tel" name="phone" required></div>
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
          <div class="form-group"><label>Date souhaitée *</label><input type="date" name="date" required></div>
          <div class="form-group"><label>Durée estimée (heures) *</label><input type="number" name="duration" min="1" max="24" required></div>
          <div class="form-group"><label>Détails du projet</label><textarea name="message" placeholder="Décrivez votre projet, nombre de musiciens, style..."></textarea></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Réserver une session</button>
        </form>
      </div>
    </section>
  `;
}

function contactPage() {
  setTimeout(() => {
    document.getElementById('contact-form')?.addEventListener('submit', handleContactForm);
  }, 0);
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Contactez-nous</h2>
      <div class="form-container">
        <form id="contact-form">
          <div class="form-group"><label>Nom complet *</label><input type="text" name="name" required></div>
          <div class="form-group"><label>Email *</label><input type="email" name="email" required></div>
          <div class="form-group"><label>Sujet *</label><input type="text" name="subject" required></div>
          <div class="form-group"><label>Message *</label><textarea name="message" required></textarea></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Envoyer</button>
        </form>
      </div>
    </section>
  `;
}

// ============================================================
// HANDLERS FORMULAIRES
// ============================================================
async function handleEquipmentBooking(e) {
  e.preventDefault();
  try {
    await api.bookEquipment(Object.fromEntries(new FormData(e.target)));
    alert('✅ Réservation enregistrée ! Nous vous contacterons sous 24h.');
    e.target.reset();
  } catch { alert('❌ Erreur lors de la réservation. Veuillez réessayer.'); }
}

async function handleStudioBooking(e) {
  e.preventDefault();
  try {
    await api.bookStudio(Object.fromEntries(new FormData(e.target)));
    alert('✅ Réservation enregistrée ! Nous vous contacterons sous 24h.');
    e.target.reset();
  } catch { alert('❌ Erreur lors de la réservation. Veuillez réessayer.'); }
}

async function handleMasteringRequest(e) {
  e.preventDefault();
  try {
    await api.requestMastering(Object.fromEntries(new FormData(e.target)));
    alert('✅ Demande enregistrée ! Nous vous enverrons un devis sous 48h.');
    e.target.reset();
  } catch { alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.'); }
}

async function handleRecordingSession(e) {
  e.preventDefault();
  try {
    await api.bookRecording(Object.fromEntries(new FormData(e.target)));
    alert('✅ Session enregistrée ! Nous vous contacterons sous 24h.');
    e.target.reset();
  } catch { alert('❌ Erreur lors de la réservation. Veuillez réessayer.'); }
}

async function handleContactForm(e) {
  e.preventDefault();
  try {
    await api.sendContact(Object.fromEntries(new FormData(e.target)));
    alert('✅ Message envoyé ! Nous vous répondrons rapidement.');
    e.target.reset();
  } catch { alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.'); }
}

// ============================================================
// PAGES LÉGALES
// ============================================================
function mentionsLegalesPage() {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Mentions Légales</h2>
      <div class="form-container" style="max-width: 800px;">
        <h3 style="color: var(--primary); margin-bottom: 1rem;">Éditeur du site</h3>
        <p style="color: var(--gray); line-height: 1.8;">UntilTheRock Studio<br>SIRET: [À REMPLIR]<br>Adresse: [À REMPLIR]<br>Téléphone: [À REMPLIR]<br>Email: contact@untiltherock.com</p>
        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Hébergement</h3>
        <p style="color: var(--gray); line-height: 1.8;">Ce site est hébergé par [NOM HÉBERGEUR]<br>Adresse: [ADRESSE HÉBERGEUR]</p>
        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Propriété intellectuelle</h3>
        <p style="color: var(--gray); line-height: 1.8;">L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
      </div>
    </section>`;
}

function politiqueConfidentialitePage() {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Politique de Confidentialité</h2>
      <div class="form-container" style="max-width: 800px;">
        <h3 style="color: var(--primary); margin-bottom: 1rem;">Collecte des données</h3>
        <p style="color: var(--gray); line-height: 1.8;">Les données personnelles collectées via les formulaires de ce site sont utilisées uniquement pour traiter vos demandes de réservation et vous contacter. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.</p>
        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Utilisation des données</h3>
        <p style="color: var(--gray); line-height: 1.8;">Vos données ne sont jamais vendues ou partagées avec des tiers. Elles sont stockées de manière sécurisée et conservées uniquement le temps nécessaire au traitement de votre demande.</p>
        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Contact</h3>
        <p style="color: var(--gray); line-height: 1.8;">Pour toute question concernant vos données personnelles: contact@untiltherock.com</p>
      </div>
    </section>`;
}

function cgvPage() {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Conditions Générales de Vente</h2>
      <div class="form-container" style="max-width: 800px;">
        <h3 style="color: var(--primary); margin-bottom: 1rem;">Article 1 - Objet</h3>
        <p style="color: var(--gray); line-height: 1.8;">Les présentes CGV régissent les relations entre UntilTheRock Studio et ses clients pour les services de location de matériel, réservation de studio, mastering et enregistrement.</p>
        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Article 2 - Réservations</h3>
        <p style="color: var(--gray); line-height: 1.8;">Toute réservation est confirmée après validation par UntilTheRock Studio. Un acompte peut être demandé pour confirmer la réservation.</p>
        <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Article 3 - Tarifs</h3>
        <p style="color: var(--gray); line-height: 1.8;">Les tarifs sont indiqués en euros TTC. Ils sont susceptibles de modification à tout moment mais sont garantis pour toute réservation confirmée.</p>
      </div>
    </section>`;
}

// ============================================================
// ADMIN - LOGIN & DASHBOARD
// ============================================================
function adminLoginPage() {
  setTimeout(() => {
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  }, 0);
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Connexion Admin</h2>
      <div class="form-container">
        <form id="login-form">
          <div class="form-group"><label>Nom d'utilisateur</label><input type="text" name="username" required></div>
          <div class="form-group"><label>Mot de passe</label><input type="password" name="password" required></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Se connecter</button>
        </form>
      </div>
    </section>`;
}

async function handleLogin(e) {
  e.preventDefault();
  try {
    const result = await api.login(Object.fromEntries(new FormData(e.target)));
    localStorage.setItem('admin_token', result.token);
    navigateTo('/admin-dashboard');
  } catch { alert('❌ Identifiants incorrects'); }
}

function adminDashboardPage() {
  if (!localStorage.getItem('admin_token')) { navigateTo('/admin-login'); return ''; }
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
      <div id="admin-content"><p style="text-align: center; color: var(--gray);">Chargement...</p></div>
    </section>`;
}

function handleLogout() {
  localStorage.removeItem('admin_token');
  navigateTo('/admin-login');
}

// ============================================================
// ADMIN - CHARGEMENT DES DONNÉES
// ============================================================
let _allContacts = [];

async function loadAdminData() {
  try {
    const bookings = await api.getAllBookings();
    const contacts = await api.getContacts();
    _allContacts = contacts || [];

    document.getElementById('admin-content').innerHTML = `
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
          <h3>Messages de Contact (${_allContacts.length})</h3>
          ${renderContactsList(_allContacts)}
        </div>
      </div>`;
  } catch {
    document.getElementById('admin-content').innerHTML = '<p style="color: var(--primary);">Erreur de chargement</p>';
  }
}

// ============================================================
// ADMIN - RÉSERVATIONS
// ============================================================
function renderBookingsList(bookings, type) {
  if (!bookings || bookings.length === 0) return '<p style="color: var(--gray);">Aucune réservation</p>';

  return bookings.map(b => `
    <div style="padding: 1.5rem; background: var(--dark); border-radius: 10px; margin-top: 1rem; border-left: 4px solid ${getStatusColor(b.status)};">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <div>
          <p style="font-size: 1.1rem; font-weight: 600;">${b.name}</p>
          <p style="color: var(--gray); font-size: 0.9rem; margin-top: 0.25rem;">📧 ${b.email} | 📞 ${b.phone}</p>
        </div>
        <span style="padding: 0.5rem 1rem; background: ${getStatusColor(b.status)}; border-radius: 20px; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">
          ${getStatusLabel(b.status)}
        </span>
      </div>
      <div style="background: var(--dark-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        ${renderBookingDetails(b, type)}
      </div>
      ${b.message ? `<div style="padding: 1rem; background: var(--dark-secondary); border-radius: 8px; margin-bottom: 1rem;"><p style="color: var(--gray); font-size: 0.9rem; font-style: italic;">"${b.message}"</p></div>` : ''}
      <p style="color: var(--gray); font-size: 0.85rem; margin-bottom: 1rem;">📅 Reçu le ${new Date(b.created_at).toLocaleString('fr-FR')}</p>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        ${b.status === 'pending' ? `<button onclick="updateBookingStatus(${b.id}, '${type}', 'confirmed')" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">✅ Confirmer</button>` : ''}
        ${b.status === 'confirmed' ? `<button onclick="updateBookingStatus(${b.id}, '${type}', 'completed')" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: var(--success); color: var(--success);">✓ Terminé</button>` : ''}
        ${b.status !== 'cancelled' ? `<button onclick="updateBookingStatus(${b.id}, '${type}', 'cancelled')" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: var(--primary); color: var(--primary);">❌ Annuler</button>` : ''}
        <button onclick="window.open('mailto:${b.email}?subject=Votre réservation UntilTheRock', '_blank')" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">📧 Email</button>
        <button onclick="deleteBooking(${b.id}, '${type}')" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: #666; color: #666;">🗑️ Supprimer</button>
      </div>
    </div>`).join('');
}

function renderBookingDetails(b, type) {
  switch (type) {
    case 'equipment': return `<p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎸 Matériel:</strong> ${b.equipment}</p><p style="color: var(--gray); font-size: 0.9rem;">📅 Du ${new Date(b.start_date).toLocaleDateString('fr-FR')} au ${new Date(b.end_date).toLocaleDateString('fr-FR')}</p>`;
    case 'studio':    return `<p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎙️ Studio:</strong> ${b.studio_type}</p><p style="color: var(--gray); font-size: 0.9rem;">📅 ${new Date(b.date).toLocaleDateString('fr-FR')} | 🕐 ${b.time_slot} (${b.duration}h)</p>`;
    case 'mastering': return `<p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎚️ Mastering:</strong> ${b.track_count} piste(s)</p><p style="color: var(--gray); font-size: 0.9rem;">📀 Format: ${b.format}</p>`;
    case 'recording': return `<p style="color: var(--light); margin-bottom: 0.5rem;"><strong>🎵 Projet:</strong> ${b.project_type}</p><p style="color: var(--gray); font-size: 0.9rem;">📅 ${new Date(b.date).toLocaleDateString('fr-FR')} | ⏱️ ${b.duration}h</p>`;
    default: return '';
  }
}

function getStatusColor(s) { return { pending: '#ff9800', confirmed: '#2196f3', completed: '#4caf50', cancelled: '#f44336' }[s] || '#666'; }
function getStatusLabel(s) { return { pending: '⏳ En attente', confirmed: '✅ Confirmé', completed: '✓ Terminé', cancelled: '❌ Annulé' }[s] || s; }

async function updateBookingStatus(id, type, newStatus) {
  const msg = { confirmed: 'Confirmer cette réservation ?', completed: 'Marquer comme terminée ?', cancelled: 'Annuler cette réservation ?' };
  if (!confirm(msg[newStatus])) return;
  try {
    await api.updateBookingStatus(type, id, newStatus);
    alert(`✅ Statut mis à jour : ${getStatusLabel(newStatus)}`);
    loadAdminData();
  } catch { alert('❌ Erreur lors de la mise à jour'); }
}

async function deleteBooking(id, type) {
  if (!confirm('Supprimer définitivement cette réservation ?\n\n⚠️ Action irréversible.')) return;
  try {
    await api.deleteBooking(type, id);
    alert('✅ Réservation supprimée !');
    loadAdminData();
  } catch { alert('❌ Erreur lors de la suppression'); }
}

// ============================================================
// ADMIN - MESSAGES CONTACT
// ============================================================
function renderContactsList(contacts) {
  if (!contacts || contacts.length === 0) return '<p style="color: var(--gray);">Aucun message</p>';

  return contacts.map(c => `
    <div style="padding: 1.5rem; background: var(--dark); border-radius: 10px; margin-top: 1rem; border-left: 4px solid ${c.status === 'unread' ? '#ff9800' : '#4caf50'};">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <p style="font-size: 1.1rem; font-weight: 600;">${c.name}</p>
          <p style="color: var(--gray); font-size: 0.9rem; margin-top: 0.25rem;">📧 ${c.email}</p>
        </div>
        <span style="padding: 0.4rem 1rem; background: ${c.status === 'unread' ? '#ff9800' : '#4caf50'}; border-radius: 20px; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">
          ${c.status === 'unread' ? '📬 Non lu' : '✓ Lu'}
        </span>
      </div>
      <p style="color: var(--primary); font-weight: 600; margin-bottom: 0.75rem;">📌 ${c.subject}</p>
      <div style="padding: 1rem; background: var(--dark-secondary); border-radius: 8px; margin-bottom: 1rem;">
        <p style="color: var(--gray); line-height: 1.6; word-break: break-word;">
          ${c.message.length > 120 ? c.message.substring(0, 120) + '<span style="color: var(--primary);">...</span>' : c.message}
        </p>
        ${c.message.length > 120 ? `<button onclick="openContactModal(${c.id})" style="margin-top: 0.5rem; background: none; border: none; color: var(--primary); cursor: pointer; font-size: 0.9rem; padding: 0; text-decoration: underline;">Lire le message complet →</button>` : ''}
      </div>
      <p style="color: var(--gray); font-size: 0.85rem; margin-bottom: 1rem;">📅 Reçu le ${new Date(c.created_at).toLocaleString('fr-FR')}</p>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <button onclick="openContactModal(${c.id})" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">👁️ Lire en entier</button>
        ${c.status === 'unread' ? `<button onclick="markContactAsRead(${c.id})" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">✓ Marquer comme lu</button>` : ''}
        <button onclick="window.open('mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}', '_blank')" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">📧 Répondre</button>
      </div>
    </div>`).join('');
}

function openContactModal(contactId) {
  const c = _allContacts.find(m => m.id === contactId);
  if (!c) return;
  document.getElementById('contact-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'contact-modal';
  modal.style.cssText = 'position:fixed;z-index:3000;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:2rem;animation:fadeIn 0.2s ease;';
  modal.innerHTML = `
    <div style="background:var(--dark-secondary);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:2.5rem;max-width:680px;width:100%;max-height:85vh;overflow-y:auto;position:relative;animation:slideUp 0.25s ease;">
      <button onclick="document.getElementById('contact-modal').remove()" style="position:absolute;top:1.25rem;right:1.25rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:var(--light);width:36px;height:36px;border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;"
        onmouseover="this.style.background='rgba(255,51,102,0.2)';this.style.borderColor='var(--primary)';this.style.color='var(--primary)'"
        onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(255,255,255,0.15)';this.style.color='var(--light)'">×</button>

      <div style="margin-bottom:1.5rem;">
        <span style="display:inline-block;padding:0.4rem 1rem;background:${c.status === 'unread' ? '#ff9800' : '#4caf50'};border-radius:20px;font-size:0.85rem;font-weight:600;">
          ${c.status === 'unread' ? '📬 Non lu' : '✓ Lu'}
        </span>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;padding:1.25rem;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.07);">
        <div>
          <p style="color:var(--gray);font-size:0.8rem;margin-bottom:0.25rem;text-transform:uppercase;letter-spacing:0.5px;">De</p>
          <p style="font-weight:600;font-size:1.05rem;">${c.name}</p>
        </div>
        <div>
          <p style="color:var(--gray);font-size:0.8rem;margin-bottom:0.25rem;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
          <p style="color:var(--primary);word-break:break-all;">${c.email}</p>
        </div>
        <div>
          <p style="color:var(--gray);font-size:0.8rem;margin-bottom:0.25rem;text-transform:uppercase;letter-spacing:0.5px;">Reçu le</p>
          <p style="font-size:0.95rem;">${new Date(c.created_at).toLocaleString('fr-FR')}</p>
        </div>
      </div>

      <div style="margin-bottom:1.5rem;">
        <p style="color:var(--gray);font-size:0.8rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.5px;">Sujet</p>
        <p style="font-size:1.2rem;font-weight:600;color:var(--primary);">${c.subject}</p>
      </div>

      <div style="padding:1.5rem;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.07);margin-bottom:2rem;line-height:1.8;white-space:pre-wrap;word-break:break-word;color:var(--light);font-size:1rem;">${c.message}</div>

      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        <button onclick="window.open('mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}&body=%0A%0A---%0AMessage original de ${encodeURIComponent(c.name)} :%0A${encodeURIComponent(c.message)}', '_blank')" class="btn btn-primary" style="flex:1;">📧 Répondre à ${c.name}</button>
        ${c.status === 'unread' ? `<button onclick="markContactAsRead(${c.id}); document.getElementById('contact-modal').remove();" class="btn btn-outline" style="flex:1;">✓ Marquer comme lu</button>` : ''}
      </div>
    </div>`;

  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);

  if (c.status === 'unread') {
    api.updateContactStatus(c.id, 'read').then(() => { c.status = 'read'; }).catch(() => {});
  }
}

async function markContactAsRead(id) {
  try {
    await api.updateContactStatus(id, 'read');
    loadAdminData();
  } catch { alert('❌ Erreur lors de la mise à jour'); }
}

// ============================================================
// ADMIN - PORTFOLIO
// ============================================================
function adminPortfolioPage() {
  if (!localStorage.getItem('admin_token')) { navigateTo('/admin-login'); return ''; }
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
      <div class="form-container" style="margin-bottom: 3rem;">
        <h3 style="color: var(--primary); margin-bottom: 1.5rem;">➕ Ajouter un Élément</h3>
        <form id="portfolio-add-form" enctype="multipart/form-data">
          <div class="form-group">
            <label>Type de service (page de destination) *</label>
            <select name="service_type" required>
              <option value="">-- Sélectionnez une page --</option>
              <option value="equipment">🎸 Location de Matériel</option>
              <option value="studio">🎙️ Réservation Studio</option>
              <option value="mastering">🎚️ Mastering</option>
              <option value="recording">🎵 Enregistrement</option>
            </select>
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">💡 Le projet apparaîtra sur la page portfolio correspondante</small>
          </div>
          <div class="form-group"><label>Titre *</label><input type="text" name="title" required placeholder="Ex: Projet Rock 2025"></div>
          <div class="form-group"><label>Description</label><textarea name="description" placeholder="Décrivez le projet..." rows="3"></textarea></div>
          <div class="form-group">
            <label>📷 Image</label>
            <div class="file-upload-container">
              <input type="file" name="image" id="image-upload" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" onchange="previewFile(this, 'image-preview')">
              <label for="image-upload" class="file-upload-label">📁 Choisir une image</label>
              <div id="image-preview" class="file-preview"></div>
            </div>
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">Formats acceptés: JPG, PNG, GIF, WEBP — Max 100MB</small>
          </div>
          <div class="form-group">
            <label>🎵 Audio</label>
            <div class="file-upload-container">
              <input type="file" name="audio" id="audio-upload" accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg" onchange="previewFile(this, 'audio-preview')">
              <label for="audio-upload" class="file-upload-label">📁 Choisir un fichier audio</label>
              <div id="audio-preview" class="file-preview"></div>
            </div>
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">Formats acceptés: MP3, WAV, OGG — Max 100MB</small>
          </div>
          <div class="form-group">
            <label>🎬 Vidéo</label>
            <div class="file-upload-container">
              <input type="file" name="video" id="video-upload" accept="video/mp4,video/webm,video/ogg,video/quicktime" onchange="previewFile(this, 'video-preview')">
              <label for="video-upload" class="file-upload-label">📁 Choisir une vidéo</label>
              <div id="video-preview" class="file-preview"></div>
            </div>
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">Formats acceptés: MP4, WEBM, OGG — Max 100MB</small>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;" id="submit-btn">➕ Ajouter au Portfolio</button>
          <div id="upload-progress" style="display: none; margin-top: 1rem;">
            <div style="background: var(--dark); border-radius: 10px; height: 30px; overflow: hidden;">
              <div id="progress-bar" style="height: 100%; width: 0%; transition: width 0.3s ease; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;"></div>
            </div>
          </div>
        </form>
      </div>
      <div class="form-container" style="max-width: 100%;">
        <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📋 Éléments Existants</h3>
        <div id="admin-portfolio-list"><p style="text-align: center; color: var(--gray);">Chargement...</p></div>
      </div>
    </section>`;
}

function previewFile(input, previewId) {
  const preview = document.getElementById(previewId);
  const file = input.files[0];
  if (!file) { preview.innerHTML = ''; return; }
  const size = (file.size / (1024 * 1024)).toFixed(2);
  if (input.accept.includes('image')) {
    const reader = new FileReader();
    reader.onload = e => { preview.innerHTML = `<div style="margin-top:1rem;"><img src="${e.target.result}" style="max-width:200px;max-height:200px;border-radius:10px;object-fit:cover;"><p style="color:var(--gray);font-size:0.9rem;margin-top:0.5rem;">${file.name} (${size} MB)</p></div>`; };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = `<div style="margin-top:1rem;padding:1rem;background:var(--dark);border-radius:10px;"><p style="color:var(--success);">✅ ${file.name}</p><p style="color:var(--gray);font-size:0.9rem;">${size} MB</p></div>`;
  }
}

async function handleAddPortfolioWithFiles(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const progressContainer = document.getElementById('upload-progress');
  const progressBar = document.getElementById('progress-bar');
  btn.disabled = true;
  btn.textContent = '⏳ Upload en cours...';
  progressContainer.style.display = 'block';

  try {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', ev => {
      if (ev.lengthComputable) {
        const pct = Math.round((ev.loaded / ev.total) * 100);
        progressBar.style.width = pct + '%';
        progressBar.textContent = pct + '%';
      }
    });
    await new Promise((resolve, reject) => {
      xhr.addEventListener('load', () => xhr.status >= 200 && xhr.status < 300 ? resolve(JSON.parse(xhr.responseText)) : reject(new Error(`Erreur ${xhr.status}`)));
      xhr.addEventListener('error', () => reject(new Error('Erreur réseau')));
      xhr.open('POST', '/api/portfolio');
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('admin_token')}`);
      xhr.send(new FormData(e.target));
    });
    alert('✅ Élément ajouté au portfolio !');
    e.target.reset();
    ['image-preview', 'audio-preview', 'video-preview'].forEach(id => { document.getElementById(id).innerHTML = ''; });
    loadAdminPortfolio();
  } catch (err) {
    alert('❌ Erreur lors de l\'upload. Vérifiez la taille des fichiers (max 100MB).');
  } finally {
    btn.disabled = false;
    btn.textContent = '➕ Ajouter au Portfolio';
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
  }
}

async function loadAdminPortfolio() {
  try {
    renderAdminPortfolio(await api.getPortfolio());
  } catch {
    document.getElementById('admin-portfolio-list').innerHTML = '<p style="color: var(--primary);">Erreur de chargement</p>';
  }
}

function renderAdminPortfolio(items) {
  const list = document.getElementById('admin-portfolio-list');
  if (items.length === 0) { list.innerHTML = '<p style="text-align:center;color:var(--gray);">Aucun élément dans le portfolio</p>'; return; }

  list.innerHTML = `<div style="display:grid;gap:2rem;">${items.map(item => `
    <div class="service-card">
      <div style="display:grid;grid-template-columns:200px 1fr;gap:2rem;align-items:start;">
        <div>
          ${item.image_url
            ? `<div style="position:relative;"><img src="${item.image_url}" style="width:100%;height:150px;object-fit:cover;border-radius:10px;cursor:pointer;" onclick="window.open('${item.image_url}','_blank')"><button onclick="deletePortfolioFile(${item.id},'image')" style="position:absolute;top:5px;right:5px;background:rgba(255,51,102,0.9);border:none;color:white;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:1.2rem;">×</button></div>`
            : `<div style="width:100%;height:150px;background:var(--dark);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--gray);">Pas d'image</div>`}
          <div style="margin-top:1rem;display:flex;flex-direction:column;gap:0.5rem;">
            ${item.audio_url ? `<div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem;background:var(--dark);border-radius:5px;"><span style="color:var(--success);font-size:0.9rem;">🎵 Audio</span><button onclick="deletePortfolioFile(${item.id},'audio')" style="background:transparent;border:none;color:var(--primary);cursor:pointer;font-size:1.2rem;">×</button></div>` : ''}
            ${item.video_url ? `<div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem;background:var(--dark);border-radius:5px;"><span style="color:var(--success);font-size:0.9rem;">🎬 Vidéo</span><button onclick="deletePortfolioFile(${item.id},'video')" style="background:transparent;border:none;color:var(--primary);cursor:pointer;font-size:1.2rem;">×</button></div>` : ''}
          </div>
        </div>
        <div>
          <h4 style="color:var(--primary);margin-bottom:0.5rem;font-size:1.3rem;">${item.title}</h4>
          <span style="display:inline-block;padding:0.25rem 0.75rem;background:var(--secondary);border-radius:20px;font-size:0.85rem;margin-bottom:1rem;">${item.service_type}</span>
          <p style="color:var(--gray);line-height:1.6;margin-bottom:1rem;">${item.description || '<em>Pas de description</em>'}</p>
          <p style="color:var(--gray);font-size:0.85rem;">📅 Ajouté le ${new Date(item.created_at).toLocaleDateString('fr-FR', { year:'numeric', month:'long', day:'numeric' })}</p>
          <div style="margin-top:1.5rem;">
            <button class="btn btn-outline" onclick="deletePortfolioItem(${item.id}, '${item.title}')" style="border-color:var(--primary);color:var(--primary);">🗑️ Supprimer l'élément</button>
          </div>
        </div>
      </div>
    </div>`).join('')}</div>`;
}

async function deletePortfolioFile(id, type) {
  const labels = { image: "l'image", audio: "l'audio", video: "la vidéo" };
  if (!confirm(`Supprimer ${labels[type]} ?`)) return;
  try {
    const r = await fetch(`/api/portfolio/${id}/file/${type}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
    if (!r.ok) throw new Error();
    alert(`✅ Fichier supprimé !`);
    loadAdminPortfolio();
  } catch { alert('❌ Erreur lors de la suppression.'); }
}

async function deletePortfolioItem(id, title) {
  if (!confirm(`Supprimer "${title}" et tous ses fichiers ?\n\n⚠️ Action irréversible.`)) return;
  try {
    await api.deletePortfolioItem(id);
    alert('✅ Élément supprimé !');
    loadAdminPortfolio();
  } catch { alert('❌ Erreur lors de la suppression.'); }
}

// ============================================================
// PORTFOLIO PUBLIC
// ============================================================
function portfolioPage() {
  setTimeout(() => loadPortfolioItems('all'), 0);
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Notre Portfolio</h2>
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline filter-btn active" onclick="filterPortfolio('all')" data-filter="all" style="margin:0.5rem;">Tout</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('equipment')" data-filter="equipment" style="margin:0.5rem;">Matériel</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('studio')" data-filter="studio" style="margin:0.5rem;">Studio</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('mastering')" data-filter="mastering" style="margin:0.5rem;">Mastering</button>
        <button class="btn btn-outline filter-btn" onclick="filterPortfolio('recording')" data-filter="recording" style="margin:0.5rem;">Enregistrement</button>
      </div>
      <div id="portfolio-grid" class="services-grid"><p style="text-align:center;color:var(--gray);">Chargement...</p></div>
    </section>`;
}

function portfolioMaterielPage()    { setTimeout(() => loadPortfolioItems('equipment'), 0); return renderPortfolioTemplate('🎸 Portfolio Matériel', 'Découvrez notre matériel en action'); }
function portfolioStudioPage()      { setTimeout(() => loadPortfolioItems('studio'), 0);    return renderPortfolioTemplate('🎙️ Portfolio Studio', 'Nos studios d\'enregistrement'); }
function portfolioMasteringPage()   { setTimeout(() => loadPortfolioItems('mastering'), 0); return renderPortfolioTemplate('🎚️ Portfolio Mastering', 'Nos réalisations de mastering'); }
function portfolioRecordingPage()   { setTimeout(() => loadPortfolioItems('recording'), 0); return renderPortfolioTemplate('🎵 Portfolio Enregistrement', 'Nos sessions d\'enregistrement'); }

function renderPortfolioTemplate(title, subtitle) {
  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">${title}</h2>
      <p style="text-align:center;color:var(--gray);font-size:1.2rem;margin-bottom:3rem;">${subtitle}</p>
      <div id="portfolio-grid" class="services-grid"><p style="text-align:center;color:var(--gray);">Chargement...</p></div>
      <div style="text-align:center;margin-top:3rem;">
        <button class="btn btn-outline" onclick="navigateTo('/portfolio')">← Voir tout le portfolio</button>
      </div>
    </section>`;
}

async function loadPortfolioItems(filter = 'all') {
  try {
    renderPublicPortfolio(await api.getPortfolio(filter === 'all' ? null : filter));
  } catch {
    document.getElementById('portfolio-grid').innerHTML = '<p style="color:var(--primary);">Erreur de chargement</p>';
  }
}

function renderPublicPortfolio(items) {
  const grid = document.getElementById('portfolio-grid');
  if (items.length === 0) {
    grid.innerHTML = `<div style="text-align:center;padding:4rem 2rem;"><div style="font-size:4rem;margin-bottom:1rem;">🎵</div><p style="color:var(--gray);font-size:1.2rem;">Aucune réalisation pour le moment</p></div>`;
    return;
  }
  grid.innerHTML = items.map(item => `
    <div class="service-card portfolio-item" style="cursor:pointer;overflow:hidden;">
      ${item.image_url
        ? `<div style="position:relative;overflow:hidden;border-radius:10px;margin-bottom:1rem;height:250px;"><img src="${item.image_url}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><div style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.7);padding:0.5rem 1rem;border-radius:20px;font-size:0.85rem;">${getServiceIcon(item.service_type)} ${getServiceLabel(item.service_type)}</div></div>`
        : `<div style="width:100%;height:250px;background:linear-gradient(135deg,var(--dark-secondary),var(--dark));border-radius:10px;margin-bottom:1rem;display:flex;align-items:center;justify-content:center;font-size:3rem;">${getServiceIcon(item.service_type)}</div>`}
      <h3 style="color:var(--primary);margin-bottom:0.5rem;font-size:1.3rem;">${item.title}</h3>
      <p style="color:var(--gray);margin-bottom:1rem;line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${item.description || 'Découvrez ce projet...'}</p>
      <div style="display:flex;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap;">
        ${item.image_url ? '<span style="display:inline-block;padding:0.25rem 0.75rem;background:var(--secondary);border-radius:15px;font-size:0.75rem;">📷 Image</span>' : ''}
        ${item.audio_url ? '<span style="display:inline-block;padding:0.25rem 0.75rem;background:var(--secondary);border-radius:15px;font-size:0.75rem;">🎵 Audio</span>' : ''}
        ${item.video_url ? '<span style="display:inline-block;padding:0.25rem 0.75rem;background:var(--secondary);border-radius:15px;font-size:0.75rem;">🎬 Vidéo</span>' : ''}
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:auto;" onclick="openPortfolioModal(${item.id})">👁️ Voir le projet</button>
    </div>`).join('');
}

function getServiceIcon(t) { return { equipment:'🎸', studio:'🎙️', mastering:'🎚️', recording:'🎵' }[t] || '🎵'; }
function getServiceLabel(t) { return { equipment:'Matériel', studio:'Studio', mastering:'Mastering', recording:'Enregistrement' }[t] || t; }

function filterPortfolio(type) {
  loadPortfolioItems(type);
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === type);
  });
}

async function openPortfolioModal(itemId) {
  try {
    const items = await api.getPortfolio();
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    document.body.insertAdjacentHTML('beforeend', `
      <div id="portfolio-modal" class="modal" style="display:flex;" onclick="closePortfolioModal(event)">
        <div class="modal-content" style="max-width:900px;max-height:90vh;overflow-y:auto;" onclick="event.stopPropagation()">
          <span class="modal-close" onclick="closePortfolioModal()">&times;</span>
          <div style="padding:2rem;">
            <div style="margin-bottom:2rem;">
              <span style="display:inline-block;padding:0.5rem 1rem;background:var(--secondary);border-radius:20px;font-size:0.9rem;margin-bottom:1rem;">${getServiceIcon(item.service_type)} ${getServiceLabel(item.service_type)}</span>
              <h2 style="color:var(--primary);font-size:2rem;margin-bottom:0.5rem;">${item.title}</h2>
              <p style="color:var(--gray);line-height:1.8;font-size:1.1rem;">${item.description || ''}</p>
            </div>
            ${item.image_url ? `<div style="margin-bottom:2rem;"><img src="${item.image_url}" alt="${item.title}" style="width:100%;border-radius:15px;box-shadow:0 10px 40px rgba(0,0,0,0.3);"></div>` : ''}
            ${item.audio_url ? `<div style="margin-bottom:2rem;"><h3 style="color:var(--primary);margin-bottom:1rem;">🎵 Extrait Audio</h3><audio controls style="width:100%;border-radius:10px;" preload="metadata"><source src="${item.audio_url}" type="audio/mpeg"><source src="${item.audio_url}" type="audio/wav"><source src="${item.audio_url}" type="audio/ogg"></audio></div>` : ''}
            ${item.video_url ? `<div style="margin-bottom:2rem;"><h3 style="color:var(--primary);margin-bottom:1rem;">🎬 Vidéo</h3><video controls style="width:100%;border-radius:15px;" preload="metadata"><source src="${item.video_url}" type="video/mp4"><source src="${item.video_url}" type="video/webm"></video></div>` : ''}
            <div style="display:flex;gap:1rem;margin-top:2rem;">
              <button class="btn btn-primary" onclick="navigateTo('/contact')">📧 Nous contacter pour un projet similaire</button>
              <button class="btn btn-outline" onclick="closePortfolioModal()">Fermer</button>
            </div>
          </div>
        </div>
      </div>`);
  } catch { alert('Erreur lors du chargement du projet'); }
}

function closePortfolioModal(event) {
  if (event && event.target.classList.contains('modal-content')) return;
  const modal = document.getElementById('portfolio-modal');
  if (modal) {
    modal.querySelectorAll('video, audio').forEach(m => m.pause());
    modal.remove();
  }
}