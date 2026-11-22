document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.current-year').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 400);
    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  const progress = document.querySelector('.reading-progress span');
  if (progress) {
    let scheduled = false;
    const updateProgress = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
        scheduled = false;
      });
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const subject = encodeURIComponent('Website inquiry from ' + formData.get('name'));
      const body = encodeURIComponent('Name: ' + formData.get('name') + '\nEmail: ' + formData.get('email') + '\n\n' + formData.get('message'));
      window.location.href = 'mailto:info@thelostvoice.org.ng?subject=' + subject + '&body=' + body;
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.hero-copy, .hero-art, .page-hero .container, .feature-card, .program-card, .story-note, .article, .photo-card, .founder-panel, .cta-band .container'
  );

  targets.forEach((element) => {
    const columns = element.parentElement?.parentElement?.children;
    const index = columns ? Math.max(0, Array.from(columns).indexOf(element.parentElement)) : 0;
    element.classList.add('motion-reveal');
    element.classList.add(index % 2 === 0 ? 'from-left' : 'from-right');
    element.style.setProperty('--motion-delay', `${Math.min(index, 5) * 75}ms`);
  });

  document.documentElement.classList.add('motion-enabled');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach((element) => observer.observe(element));
});
