// /js/main.js

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // optional icon toggle
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // close menu when link clicked
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // optional: keep visible after reveal (no unobserve if you want permanent)
      // observer.unobserve(entry.target); // uncomment to animate only once
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }); // subtle offset

revealElements.forEach(el => observer.observe(el));

// ===== smooth scroll for anchor links (optional) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === "#" || href === "") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== active nav highlight based on current page =====
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentLocation) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ===== tiny hover effect on cards (already in css) =====
// keeping js minimal – just for demo

console.log('Rwambera Drumline — rhythm awakens');



// add to existing /js/main.js (preserve previous code, append this gallery lightbox logic)

// ========== GALLERY LIGHTBOX ==========
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!lightbox || !galleryItems.length) return; // not on gallery page

  let currentIndex = 0;
  const images = [];

  // build array from gallery images (with caption from data-caption)
  galleryItems.forEach((img, index) => {
    const src = img.src;
    const caption = img.getAttribute('data-caption') || img.alt || 'Rwambera Drumline';
    images.push({ src, caption });

    img.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox(currentIndex);
    });
  });

  function openLightbox(index) {
    lightbox.classList.add('active');
    updateLightboxContent(index);
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function updateLightboxContent(index) {
    const imgData = images[index];
    lightboxImg.src = imgData.src;
    lightboxImg.alt = imgData.caption;
    lightboxCaption.textContent = imgData.caption;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxContent(currentIndex);
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxContent(currentIndex);
  }

  // event listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // click outside image to close (but not on navigation arrows)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
});

// (the previous hamburger, scroll reveal, active nav remain unchanged)
// make sure the reveal observer and nav code are still present above/below
