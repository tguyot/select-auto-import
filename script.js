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