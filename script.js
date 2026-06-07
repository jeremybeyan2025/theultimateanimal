const revealItems = document.querySelectorAll('.reveal');
const header = document.querySelector('.site-header');
const core = document.querySelector('.animal-core');
const floatingCards = document.querySelectorAll('.floating-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 320)}ms`;
  observer.observe(item);
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    header.style.background = 'rgba(5, 8, 11, .86)';
    header.style.boxShadow = '0 24px 70px rgba(0,0,0,.55)';
  } else {
    header.style.background = 'rgba(5, 8, 11, .68)';
    header.style.boxShadow = '0 30px 90px rgba(0,0,0,.45)';
  }
});

if (core) {
  core.addEventListener('mousemove', (event) => {
    const rect = core.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = -((y / rect.height) - 0.5) * 16;
    core.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    floatingCards.forEach((card, index) => {
      const depth = (index + 1) * 7;
      card.style.transform = `translate3d(${rotateY * depth / 4}px, ${rotateX * depth / 4}px, ${depth}px)`;
    });
  });

  core.addEventListener('mouseleave', () => {
    core.style.transform = 'rotateX(0deg) rotateY(0deg)';
    floatingCards.forEach((card) => {
      card.style.transform = 'translate3d(0,0,0)';
    });
  });
}

const peptideRows = document.querySelectorAll('.peptide-row');
peptideRows.forEach((row) => {
  row.addEventListener('mouseenter', () => {
    row.style.background = 'rgba(38, 231, 255, .075)';
  });
  row.addEventListener('mouseleave', () => {
    row.style.background = 'transparent';
  });
});

const formButton = document.querySelector('.contact-form button');
if (formButton) {
  formButton.addEventListener('click', () => {
    formButton.textContent = 'Access Request Captured';
    formButton.style.filter = 'saturate(1.25) brightness(1.08)';
  });
}
