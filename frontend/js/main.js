// Router simple pour SPA
const routes = {
  '/': homePage,
  '/portfolio': portfolioPage,
  '/admin-portfolio': adminPortfolioPage,
  '/reservation-materiel': reservationMaterielPage,
  '/reservation-studio': reservationStudioPage,
  '/mastering': masteringPage,
  '/enregistrement': enregistrementPage,
  '/contact': contactPage,
  '/admin-login': adminLoginPage,
  '/admin-dashboard': adminDashboardPage,
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

// Ajouter cette fonction dans main.js

function adminPortfolioPage() {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    navigateTo('/admin-login');
    return '';
  }

  setTimeout(() => {
    loadAdminPortfolio();
    document.getElementById('portfolio-add-form')?.addEventListener('submit', handleAddPortfolio);
  }, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 class="section-title" style="margin: 0;">Gestion Portfolio</h2>
        <button class="btn btn-outline" onclick="navigateTo('/admin-dashboard')">← Retour Dashboard</button>
      </div>

      <!-- Formulaire d'ajout -->
      <div class="form-container" style="margin-bottom: 3rem;">
        <h3 style="color: var(--primary); margin-bottom: 1.5rem;">Ajouter un Élément</h3>
        <form id="portfolio-add-form">
          <div class="form-group">
            <label>Type de service *</label>
            <select name="service_type" required>
              <option value="mastering">Mastering</option>
              <option value="recording">Enregistrement</option>
              <option value="studio">Studio</option>
              <option value="equipment">Matériel</option>
            </select>
          </div>

          <div class="form-group">
            <label>Titre *</label>
            <input type="text" name="title" required placeholder="Ex: Projet Rock 2025">
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Décrivez le projet..."></textarea>
          </div>

          <div class="form-group">
            <label>URL de l'image</label>
            <input type="url" name="image_url" placeholder="/assets/uploads/images/projet1.jpg">
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">
              📁 Placez vos images dans: frontend/assets/uploads/images/
            </small>
          </div>

          <div class="form-group">
            <label>URL de l'audio</label>
            <input type="url" name="audio_url" placeholder="/assets/uploads/audio/extrait.mp3">
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">
              🎵 Placez vos fichiers audio dans: frontend/assets/uploads/audio/<br>
              Formats supportés: MP3, WAV, OGG
            </small>
          </div>

          <div class="form-group">
            <label>URL de la vidéo</label>
            <input type="url" name="video_url" placeholder="/assets/uploads/videos/making-of.mp4">
            <small style="color: var(--gray); display: block; margin-top: 0.5rem;">
              🎬 Placez vos vidéos dans: frontend/assets/uploads/videos/<br>
              Formats supportés: MP4, WEBM, OGG
            </small>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">
            ➕ Ajouter au Portfolio
          </button>
        </form>
      </div>

      <!-- Liste des éléments existants -->
      <div class="form-container" style="max-width: 100%;">
        <h3 style="color: var(--primary); margin-bottom: 1.5rem;">Éléments Existants</h3>
        <div id="admin-portfolio-list">
          <p style="text-align: center; color: var(--gray);">Chargement...</p>
        </div>
      </div>
    </section>
  `;
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
    list.innerHTML = '<p style="text-align: center; color: var(--gray);">Aucun élément</p>';
    return;
  }

  list.innerHTML = `
    <div style="display: grid; gap: 1.5rem;">
      ${items.map(item => `
        <div class="service-card" style="display: grid; grid-template-columns: 150px 1fr auto; gap: 1.5rem; align-items: start;">
          <!-- Miniature -->
          <div>
            ${item.image_url ? `
              <img 
                src="${item.image_url}" 
                alt="${item.title}"
                style="width: 100%; height: 100px; object-fit: cover; border-radius: 10px;"
              />
            ` : `
              <div style="width: 100%; height: 100px; background: var(--dark); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--gray);">
                Pas d'image
              </div>
            `}
            ${item.audio_url ? '<div style="margin-top: 0.5rem; color: var(--success);">🎵 Audio</div>' : ''}
            ${item.video_url ? '<div style="margin-top: 0.5rem; color: var(--success);">🎬 Vidéo</div>' : ''}
          </div>

          <!-- Informations -->
          <div>
            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">${item.title}</h4>
            <span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--secondary); border-radius: 20px; font-size: 0.85rem; margin-bottom: 0.5rem;">
              ${item.service_type}
            </span>
            <p style="color: var(--gray); font-size: 0.9rem; margin-top: 0.5rem;">
              ${item.description || 'Pas de description'}
            </p>
            <p style="color: var(--gray); font-size: 0.85rem; margin-top: 0.5rem;">
              Ajouté le ${new Date(item.created_at).toLocaleDateString('fr-FR')}
            </p>
          </div>

          <!-- Actions -->
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <button 
              class="btn btn-outline" 
              onclick="editPortfolioItem(${item.id})"
              style="padding: 0.5rem 1rem; font-size: 0.9rem;"
            >
              ✏️ Modifier
            </button>
            <button 
              class="btn btn-outline" 
              onclick="deletePortfolioItem(${item.id})"
              style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: var(--primary); color: var(--primary);"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Ajouter un élément au portfolio
async function handleAddPortfolio(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    await api.addPortfolioItem(data);
    alert('✅ Élément ajouté au portfolio !');
    e.target.reset();
    loadAdminPortfolio(); // Recharger la liste
  } catch (error) {
    alert('❌ Erreur lors de l\'ajout. Vérifiez que vous êtes bien connecté.');
  }
}

// Supprimer un élément
async function deletePortfolioItem(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
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

// Modifier un élément (à implémenter)
function editPortfolioItem(id) {
  alert('Fonction de modification à venir. Pour l\'instant, supprimez et recréez l\'élément.');
}

function portfolioPage() {
  // Charger les éléments du portfolio au chargement
  setTimeout(loadPortfolioItems, 0);

  return `
    <section class="section" style="padding-top: 120px;">
      <h2 class="section-title">Notre Portfolio</h2>
      
      <!-- Filtres -->
      <div style="text-align: center; margin-bottom: 3rem;">
        <button class="btn btn-outline" onclick="filterPortfolio('all')" style="margin: 0.5rem;">Tout</button>
        <button class="btn btn-outline" onclick="filterPortfolio('mastering')" style="margin: 0.5rem;">Mastering</button>
        <button class="btn btn-outline" onclick="filterPortfolio('recording')" style="margin: 0.5rem;">Enregistrement</button>
        <button class="btn btn-outline" onclick="filterPortfolio('studio')" style="margin: 0.5rem;">Studio</button>
      </div>

      <!-- Grille Portfolio -->
      <div id="portfolio-grid" class="services-grid">
        <p style="text-align: center; color: var(--gray);">Chargement...</p>
      </div>

      <!-- Modal pour voir en grand -->
      <div id="media-modal" class="modal" style="display: none;">
        <div class="modal-content">
          <span class="modal-close" onclick="closeModal()">&times;</span>
          <div id="modal-body"></div>
        </div>
      </div>
    </section>
  `;
}

// Charger les éléments du portfolio
async function loadPortfolioItems(filter = 'all') {
  try {
    const items = await api.getPortfolio(filter === 'all' ? null : filter);
    renderPortfolio(items);
  } catch (error) {
    document.getElementById('portfolio-grid').innerHTML = 
      '<p style="color: var(--primary);">Erreur de chargement</p>';
  }
}

// Afficher le portfolio
function renderPortfolio(items) {
  const grid = document.getElementById('portfolio-grid');
  
  if (items.length === 0) {
    grid.innerHTML = '<p style="text-align: center; color: var(--gray);">Aucun élément pour le moment</p>';
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="service-card portfolio-item" data-type="${item.service_type}">
      <!-- Image -->
      ${item.image_url ? `
        <img 
          src="${item.image_url}" 
          alt="${item.title}"
          style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem; cursor: pointer;"
          onclick="openImageModal('${item.image_url}', '${item.title}')"
        />
      ` : '<div style="width: 100%; height: 200px; background: var(--dark); border-radius: 10px; margin-bottom: 1rem;"></div>'}

      <!-- Titre -->
      <h3 style="color: var(--primary); margin-bottom: 0.5rem;">${item.title}</h3>
      
      <!-- Badge du type -->
      <span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--secondary); border-radius: 20px; font-size: 0.85rem; margin-bottom: 1rem;">
        ${item.service_type}
      </span>

      <!-- Description -->
      <p style="color: var(--gray); margin-bottom: 1rem;">${item.description || ''}</p>

      <!-- Player Audio -->
      ${item.audio_url ? `
        <audio controls style="width: 100%; margin-top: 1rem;" preload="metadata">
          <source src="${item.audio_url}" type="audio/mpeg">
          <source src="${item.audio_url}" type="audio/wav">
          <source src="${item.audio_url}" type="audio/ogg">
          Votre navigateur ne supporte pas l'audio.
        </audio>
      ` : ''}

      <!-- Bouton Voir Plus -->
      ${item.video_url ? `
        <button 
          class="btn btn-primary" 
          style="width: 100%; margin-top: 1rem;"
          onclick="openVideoModal('${item.video_url}', '${item.title}')"
        >
          🎥 Voir la Vidéo
        </button>
      ` : ''}
    </div>
  `).join('');
}

// Filtrer le portfolio
function filterPortfolio(type) {
  loadPortfolioItems(type);
  
  // Mettre à jour les boutons actifs
  document.querySelectorAll('.btn-outline').forEach(btn => {
    btn.style.background = 'transparent';
    btn.style.color = 'var(--primary)';
  });
  event.target.style.background = 'var(--primary)';
  event.target.style.color = 'var(--light)';
}

// Ouvrir l'image en grand
function openImageModal(imageUrl, title) {
  const modal = document.getElementById('media-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <h2 style="color: var(--primary); margin-bottom: 1rem;">${title}</h2>
    <img 
      src="${imageUrl}" 
      alt="${title}"
      style="width: 100%; max-height: 80vh; object-fit: contain; border-radius: 10px;"
    />
  `;
  
  modal.style.display = 'flex';
}

// Ouvrir la vidéo en modal
function openVideoModal(videoUrl, title) {
  const modal = document.getElementById('media-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <h2 style="color: var(--primary); margin-bottom: 1rem;">${title}</h2>
    <video 
      controls 
      autoplay
      style="width: 100%; max-height: 80vh; border-radius: 10px;"
    >
      <source src="${videoUrl}" type="video/mp4">
      <source src="${videoUrl}" type="video/webm">
      <source src="${videoUrl}" type="video/ogg">
      Votre navigateur ne supporte pas la vidéo.
    </video>
  `;
  
  modal.style.display = 'flex';
}

// Fermer le modal
function closeModal() {
  const modal = document.getElementById('media-modal');
  const modalBody = document.getElementById('modal-body');
  
  // Arrêter la vidéo si elle joue
  const video = modalBody.querySelector('video');
  if (video) {
    video.pause();
  }
  
  modal.style.display = 'none';
  modalBody.innerHTML = '';
}

// Fermer en cliquant en dehors
document.addEventListener('click', (e) => {
  const modal = document.getElementById('media-modal');
  if (e.target === modal) {
    closeModal();
  }
});

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
        <button class="btn btn-outline" onclick="handleLogout()">Déconnexion</button>
        <button class="btn btn-primary" onclick="navigateTo('/admin-portfolio')">
          Gérer le Portfolio
        </button>
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

function renderBookingsList(bookings, type) {
  if (!bookings || bookings.length === 0) {
    return '<p style="color: var(--gray);">Aucune réservation</p>';
  }
  
  return bookings.slice(0, 5).map(b => `
    <div style="padding: 1rem; background: var(--dark); border-radius: 10px; margin-top: 1rem;">
      <p><strong>${b.name}</strong> - ${b.email}</p>
      <p style="color: var(--gray); font-size: 0.9rem;">${new Date(b.created_at).toLocaleString('fr-FR')}</p>
      <span style="display: inline-block; padding: 0.25rem 0.75rem; background: ${b.status === 'pending' ? 'orange' : 'green'}; border-radius: 20px; font-size: 0.85rem; margin-top: 0.5rem;">${b.status}</span>
    </div>
  `).join('');
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