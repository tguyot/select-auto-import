// Templates HTML
const menuHTML = `
<nav>
    <div class="logo">SelectAuto<span>Import</span></div>
    <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <ul class="menu" id="menu">
        <li><a href="index.html">Accueil</a></li>
         <li><a href="vehicules.html">Véhicules</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
`;

const footerHTML = `
<footer>
    <div class="footer-content">
        <div class="footer-section">
            <h3>SelectAutoImport</h3>
            <p>Spécialiste de l'importation de véhicules de qualité depuis l'Europe.</p>
        </div>
        <div class="footer-section">
            <h3>Liens utiles</h3>
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="vehicules.html">Véhicules</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Contact</h3>
            <p><i class="fas fa-map-marker-alt"></i> 4 Avenue André Citroën, 44800 Saint-Herblain</p>
            <p><i class="fas fa-phone"></i> 06 12 80 87 77</p>
            <p><i class="fas fa-envelope"></i> contact@autoimport.fr</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2024 SARL SELECT AUTO IMPORT. Tous droits réservés.</p>
    </div>
</footer>
`;

// Fonction d'initialisation du menu
function setupMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });
        
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Charge les éléments partagés
document.addEventListener('DOMContentLoaded', () => {
    // Insertion du menu
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) menuContainer.innerHTML = menuHTML;
    
    // Insertion du footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) footerContainer.innerHTML = footerHTML;
    
    // Initialise le menu
    setupMenu();
});
function loadVehicles() {
    fetch('vehicles.json')
        .then(response => response.json())
        .then(vehicles => {
            const container = document.getElementById('vehicleContainer');
            const template = document.getElementById('vehicleTemplate');
            
            // Effacer le contenu existant
            container.innerHTML = '';
            
            // Créer une carte pour chaque véhicule
            vehicles.forEach(vehicle => {
                const clone = template.content.cloneNode(true);
                
                // Remplir les données
                clone.querySelector('.vehicle-image').src = vehicle.photo;
                clone.querySelector('.vehicle-image').alt = `${vehicle.marque} ${vehicle.modele}`;
                clone.querySelector('.vehicle-title').textContent = `${vehicle.marque} ${vehicle.modele}`;
                clone.querySelector('.vehicle-year').textContent = vehicle.annee;
                clone.querySelector('.vehicle-km').textContent = vehicle.km.toLocaleString();
                clone.querySelector('.vehicle-fuel').textContent = vehicle.carburant;
                clone.querySelector('.vehicle-gearbox').textContent = vehicle.boite;
                clone.querySelector('.price').textContent = `${vehicle.prix.toLocaleString()} €`;
                clone.querySelector('.vehicle-link').href = vehicle.lien;
                
                // Ajouter des data-attributes pour le filtrage
                clone.querySelector('.vehicle-card').dataset.brand = vehicle.marque.toLowerCase();
                
                container.appendChild(clone);
            });
            
            // Activer les filtres
            setupFilters();
        });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            filterVehicles();
        });
    });
    
    searchInput.addEventListener('input', filterVehicles);
}

function filterVehicles() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const vehicles = document.querySelectorAll('.vehicle-card');
    
    vehicles.forEach(vehicle => {
        const brand = vehicle.dataset.brand;
        const title = vehicle.querySelector('.vehicle-title').textContent.toLowerCase();
        const shouldShow = 
            (activeFilter === 'all' || brand.includes(activeFilter)) &&
            title.includes(searchTerm);
        
        vehicle.style.display = shouldShow ? 'block' : 'none';
    });
}

// Charger les véhicules au démarrage
document.addEventListener('DOMContentLoaded', () => {
    // Votre code existant...
    loadVehicles();
});