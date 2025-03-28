// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Navigation fluide
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Changement de couleur de la navbar au scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(51, 51, 51, 0.95)';
        } else {
            nav.style.backgroundColor = '#333';
        }
    });

    // Initialisation de la carte Leaflet
    const map = L.map('map').setView([14.6928, -17.4467], 12); // Coordonnées de Dakar
    
    // Couches de carte
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    
    osmLayer.addTo(map);
    
    // Contrôles des couches
    document.getElementById('satellite').addEventListener('click', function() {
        map.removeLayer(osmLayer);
        satelliteLayer.addTo(map);
    });
    
    document.getElementById('terrain').addEventListener('click', function() {
        map.removeLayer(satelliteLayer);
        osmLayer.addTo(map);
    });
    
    document.getElementById('reset').addEventListener('click', function() {
        map.setView([14.6928, -17.4467], 12);
    });
    
    // Données simulées (à remplacer par vos vraies données)
    const agroforestryAreas = [
        { lat: 14.7028, lng: -17.4567, name: "Parcelle A", status: "healthy" },
        { lat: 14.6828, lng: -17.4367, name: "Parcelle B", status: "risk" },
        { lat: 14.7128, lng: -17.4267, name: "Parcelle C", status: "healthy" },
        { lat: 14.6928, lng: -17.4667, name: "Parcelle D", status: "risk" }
    ];
    
    const waterPoints = [
        { lat: 14.6958, lng: -17.4467, name: "Point d'eau 1" },
        { lat: 14.6898, lng: -17.4417, name: "Point d'eau 2" }
    ];
    
    // Ajout des marqueurs
    agroforestryAreas.forEach(area => {
        const color = area.status === "healthy" ? '#2c8a4a' : '#ff9800';
        L.circleMarker([area.lat, area.lng], {
            radius: 8,
            fillColor: color,
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map).bindPopup(`<b>${area.name}</b><br>Statut: ${area.status === "healthy" ? "Sain" : "À risque"}`);
    });
    
    waterPoints.forEach(point => {
        L.circleMarker([point.lat, point.lng], {
            radius: 8,
            fillColor: '#2196F3',
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map).bindPopup(`<b>${point.name}</b>`);
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ici vous pourriez ajouter le code pour envoyer le formulaire
            alert('Merci pour votre message! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }
});