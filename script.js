// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const valentinesDay = new Date('2026-02-14').getTime();
    const now = new Date().getTime();
    const distance = valentinesDay - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById('days')) {
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    if (distance < 0) {
        if (document.getElementById('days')) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const emotion = document.getElementById('emotion').value;
        const message = document.getElementById('message').value;

        // Store message in localStorage
        const formData = {
            name: name,
            email: email,
            subject: subject,
            emotion: emotion,
            message: message,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        const messages = JSON.parse(localStorage.getItem('loveMessages')) || [];
        messages.push(formData);
        localStorage.setItem('loveMessages', JSON.stringify(messages));

        // Show success message after form submits
        setTimeout(() => {
            contactForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';

            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        }, 500);
    });
}

// ===== PLAYLIST FUNCTIONALITY =====
function toggleSong(element) {
    const playBtn = element.querySelector('.song-play');
    const isPlaying = playBtn.innerText === '⏸';
    
    // Stop all other songs
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.querySelector('.song-play').innerText = '▶';
        item.style.background = '';
    });

    // Toggle current song
    if (!isPlaying) {
        playBtn.innerText = '⏸';
        element.style.background = 'linear-gradient(135deg, #ffe6f0, #ffccee)';
    } else {
        playBtn.innerText = '▶';
        element.style.background = '';
    }
}

const playAllBtn = document.getElementById('playAllBtn');
if (playAllBtn) {
    playAllBtn.addEventListener('click', function() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        let isPlaying = playAllBtn.innerText.includes('⏸');

        playlistItems.forEach(item => {
            const playBtn = item.querySelector('.song-play');
            if (isPlaying) {
                playBtn.innerText = '▶';
                item.style.background = '';
            } else {
                playBtn.innerText = '⏸';
                item.style.background = 'linear-gradient(135deg, #ffe6f0, #ffccee)';
            }
        });

        playAllBtn.innerText = isPlaying ? '▶ Play All' : '⏸ Pause All';
    });
}

// ===== GALLERY MODAL FUNCTIONALITY =====
function openModal(index) {
    const modal = document.getElementById('imageModal');
    if (modal) {
        const galleryItems = [
            { emoji: '💌', title: 'Love Letter', description: 'A heartfelt letter expressing true feelings and deep affection.' },
            { emoji: '💐', title: 'Beautiful Flowers', description: 'A bouquet of flowers that represents the beauty of our love.' },
            { emoji: '💍', title: 'Precious Moments', description: 'Every moment with you is a precious gift I treasure forever.' },
            { emoji: '🎁', title: 'Special Gifts', description: 'Small gifts that carry big meaning and love inside.' },
            { emoji: '🌹', title: 'Red Rose', description: 'A single red rose that symbolizes deep love and passion.' },
            { emoji: '❤️', title: 'Pure Love', description: 'The purest form of love that beats in every heartbeat.' }
        ];

        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');

        modalImage.textContent = galleryItems[index].emoji;
        modalTitle.textContent = galleryItems[index].title;
        modalDescription.textContent = galleryItems[index].description;

        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function goBack() {
    window.location.href = 'index-home.html';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && event.target == modal) {
        modal.style.display = 'none';
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE LINK HIGHLIGHTING =====
window.addEventListener('load', function() {
    const currentLocation = location.pathname;
    const currentPage = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index-home.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONFETTI ANIMATION (Optional Fun Effect) =====
function createConfetti() {
    if (Math.random() > 0.5) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#ff66b2', '#ff3399', '#ff99cc', '#ffccee'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        let top = 0;
        let opacity = 1;
        const animation = setInterval(() => {
            top += Math.random() * 5 + 2;
            opacity -= 0.01;
            confetti.style.top = top + 'px';
            confetti.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 30);
    }
}

// Create confetti occasionally
setInterval(createConfetti, 300);

// ===== MOBILE MENU TOGGLE =====
function setupMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    if (!navMenu || !navContainer) return;

    // create one toggle button if not present
    let toggleBtn = navContainer.querySelector('.nav-toggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.className = 'nav-toggle';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Toggle navigation');
        toggleBtn.innerHTML = '☰';
        toggleBtn.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
        });
        navContainer.appendChild(toggleBtn);
    }

    function applyResponsive() {
        if (window.innerWidth <= 768) {
            // let CSS handle visibility; ensure toggle visible
            toggleBtn.style.display = 'block';
            navMenu.classList.remove('desktop');
        } else {
            // ensure menu visible on desktop and hide mobile classes
            toggleBtn.style.display = 'none';
            navMenu.classList.remove('open');
            navMenu.classList.add('desktop');
        }
    }

    applyResponsive();
    window.addEventListener('resize', applyResponsive);
}

setupMobileMenu();

// ===== LOCAL STORAGE - VIEW SAVED MESSAGES =====
function viewSavedMessages() {
    const messages = JSON.parse(localStorage.getItem('loveMessages')) || [];
    if (messages.length > 0) {
        console.log('Saved Love Messages:', messages);
        return messages;
    }
    return [];
}

// Make viewSavedMessages available globally
window.viewSavedMessages = viewSavedMessages;
