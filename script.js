document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            // Basculer les classes 'active'
            this.classList.toggle('active');
            menu.classList.toggle('active');
            
            // Empêcher le défilement de la page quand le menu est ouvert
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = ''; // Rétablir le défilement
            });
        });
    } else {
        console.error("Éléments du menu non trouvés!");
    }
});