// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile menu toggle ──
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('active');
  });
});

// ── Scroll reveal animations ──
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// ── Animated stat counters ──
function animateCounters() {
  document.querySelectorAll('.stat h3 .gradient-text').forEach(el => {
    const text = el.textContent;
    const num = parseInt(text);
    const suffix = text.replace(/[0-9]/g, '');
    let current = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 30);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Sent! ✅';
  btn.style.opacity = '0.7';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message ✉️';
    btn.style.opacity = '1';
    btn.disabled = false;
    e.target.reset();
  }, 2500);
}

// ── Smooth parallax on hero orbs ──
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 12;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

console.log('Portfolio Loaded');