const accordionButtons = document.querySelectorAll('.accordion-btn');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const expanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});

const navLinks = document.querySelectorAll('.top-nav a');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === id;
        link.classList.toggle('active', isActive);
      });
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => observer.observe(section));

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
