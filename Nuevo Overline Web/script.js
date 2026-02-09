const header = document.getElementById('header');
let ticking = false;

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeader);
    }
}, { passive: true });

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5, rootMargin: '0px' });

document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

const tools = [
    {
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>`,
        title: 'Comisaría Virtual',
        description: 'Sistema de gestión policial integrado. Revisa antecedentes, multas y órdenes de arresto en tiempo real.',
        color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        features: ['Antecedentes penales', 'Registro de multas', 'Órdenes activas', 'Chat interno'],
        url: '' 
    },
    {
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
            <circle cx="7" cy="15" r="1.5" fill="currentColor"/>
            <line x1="11" y1="14" x2="18" y2="14"/>
            <line x1="11" y1="17" x2="16" y2="17"/>
            <circle cx="7" cy="7" r="1" fill="currentColor"/>
        </svg>`,
        title: 'Portal de Identidad',
        description: 'Gestiona tu identidad ciudadana. Licencias, documentos y permisos en un solo lugar.',
        color: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
        features: ['Licencia de conducir', 'Cédula digital', 'Permisos especiales', 'Historial completo'],
        url: '' 
    },
    {
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 17h14v-4l-2-5H7l-2 5v4z"/>
            <circle cx="7" cy="17" r="2"/>
            <circle cx="17" cy="17" r="2"/>
            <path d="M5 17h-2v-6l1.5-4.5h15L21 11v6h-2"/>
            <path d="M7 11h10"/>
        </svg>`,
        title: 'Registro Vehicular',
        description: 'Sistema de registro y gestión de vehículos. Patentes, seguros y transferencias.',
        color: 'linear-gradient(135deg, #10b981, #22c55e)',
        features: ['Registro de patentes', 'Seguros activos', 'Transferencias', 'Multas vehiculares'],
        url: '' 
    },
    {
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>`,
        title: 'Portal Inmobiliario',
        description: 'Compra, vende y arrienda propiedades. Sistema integrado con economía del servidor.',
        color: 'linear-gradient(135deg, #f97316, #fb923c)',
        features: ['Propiedades disponibles', 'Arriendos', 'Historial de precios', 'Contratos digitales'],
        url: ''
    },
    {
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>`,
        title: 'Bolsa de Trabajo',
        description: 'Encuentra empleo en la ciudad. Postula a empresas, negocios y facciones.',
        color: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        features: ['Ofertas de empleo', 'Postulaciones', 'CV digital', 'Recomendaciones'],
        url: '' 
    },
    {
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>`,
        title: 'Sistema Judicial',
        description: 'Causas judiciales, demandas y procesos legales gestionados digitalmente.',
        color: 'linear-gradient(135deg, #ef4444, #f97316)',
        features: ['Causas activas', 'Demandas civiles', 'Apelaciones', 'Historial judicial'],
        url: '' 
    }
];

let currentToolIndex = 0;

function renderTool(index) {
    const tool = tools[index];
    const carouselContent = document.getElementById('carouselContent');
    
    const linkButton = tool.url ? `
        <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-link-btn" title="Abrir ${tool.title}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
        </a>
    ` : '';
    
    carouselContent.innerHTML = `
        <div class="tool-card active">
            ${linkButton}
            <div class="tool-icon" style="background: ${tool.color}">
                ${tool.icon}
            </div>
            <div class="tool-content">
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <div class="tool-features">
                    ${tool.features.map(feature => `
                        <div class="tool-feature">${feature}</div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderToolDots() {
    const dotsContainer = document.getElementById('carouselDots');
    dotsContainer.innerHTML = tools.map((_, index) => `
        <div class="carousel-dot ${index === currentToolIndex ? 'active' : ''}" data-index="${index}"></div>
    `).join('');
    
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentToolIndex = parseInt(dot.getAttribute('data-index'));
            renderTool(currentToolIndex);
            renderToolDots();
        });
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    currentToolIndex = (currentToolIndex - 1 + tools.length) % tools.length;
    renderTool(currentToolIndex);
    renderToolDots();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentToolIndex = (currentToolIndex + 1) % tools.length;
    renderTool(currentToolIndex);
    renderToolDots();
});

renderTool(currentToolIndex);
renderToolDots();

const galleryImages = [
    {
        src: './assets/images/gallery/gallery-1.png',
        alt: 'Chile RolePlay Community - Escena de Bomberos',
        featured: true
    },
    {
        src: './assets/images/gallery/gallery-2.png',
        alt: 'Chile RolePlay Community Accidente Automovilistica'
    },
    {
        src: './assets/images/gallery/gallery-3.png',
        alt: 'Chile RolePlay Community Unidades de SAMU'
    },
    {
        src: './assets/images/gallery/gallery-4.png',
        alt: 'Chile RolePlay Community - Unidades Bomberos',
        wide: true
    },
    {
        src: './assets/images/gallery/gallery-5.png',
        alt: 'Chile RolePlay Community Unidad K-1'
    },
    {
        src: './assets/images/gallery/gallery-6.png',
        alt: 'Chile RolePlay Community Bomberos de Chile'
    },
    {
        src: './assets/images/gallery/gallery-7.png',
        alt: 'Chile RolePlay Community Vida Diaria'
    },
    {
        src: './assets/images/gallery/gallery-8.png',
        alt: 'Chile RolePlay Community Robo a McDonalds'
    }
];

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    galleryGrid.innerHTML = galleryImages.map((image, index) => {
        const classes = ['gallery-item'];
        if (image.featured) classes.push('featured');
        if (image.wide) classes.push('wide');
        
        return `
            <div class="${classes.join(' ')}" data-index="${index}">
                <img src="${image.src}" alt="${image.alt}">
                <div class="gallery-overlay">
                    <span class="gallery-text">${image.alt}</span>
                </div>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openGalleryModal(index);
        });
    });
}

let currentGalleryIndex = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const image = galleryImages[index];
    
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    
    modal.classList.add('active');
    renderModalDots();
}

function closeGalleryModal() {
    document.getElementById('galleryModal').classList.remove('active');
}

function renderModalDots() {
    const dotsContainer = document.getElementById('modalDots');
    dotsContainer.innerHTML = galleryImages.map((_, index) => `
        <div class="modal-dot ${index === currentGalleryIndex ? 'active' : ''}" data-index="${index}"></div>
    `).join('');
    
    document.querySelectorAll('.modal-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            openGalleryModal(index);
        });
    });
}

document.getElementById('modalClose').addEventListener('click', closeGalleryModal);

document.getElementById('modalPrev').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    openGalleryModal(currentGalleryIndex);
});

document.getElementById('modalNext').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    openGalleryModal(currentGalleryIndex);
});

document.getElementById('galleryModal').addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
        closeGalleryModal();
    }
});

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeGalleryModal();
        } else if (e.key === 'ArrowLeft') {
            document.getElementById('modalPrev').click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('modalNext').click();
        }
    }
});

renderGallery();

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
