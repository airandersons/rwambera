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
