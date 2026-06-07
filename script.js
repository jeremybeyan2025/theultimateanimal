const revealItems = document.querySelectorAll('.reveal');
const cursorLight = document.querySelector('.cursor-light');
const topbar = document.querySelector('.topbar');
const cards = document.querySelectorAll('.matrix-card');
const title = document.getElementById('condition-title');
const copy = document.getElementById('condition-copy');
const tags = document.getElementById('condition-tags');

const conditionData = {
  joint: {
    title: 'Joint Degeneration & Mobility',
    copy: 'For aging pets, working dogs, sport horses, arthritis conversations, and vet-managed mobility support pathways.',
    tags: ['BPC-157', 'TB-500', 'KPV']
  },
  soft: {
    title: 'Tendon, Ligament & Soft Tissue',
    copy: 'For CCL stress, equine tendon load, agility injuries, strain recovery, and structured rehab conversations.',
    tags: ['TB-500', 'BPC-157', 'Thymosin β4']
  },
  post: {
    title: 'Post-Procedure Recovery',
    copy: 'For professional post-procedure tissue support discussions under veterinary supervision and clinic protocols.',
    tags: ['BPC-157', 'GHK-Cu', 'TB-500']
  },
  gut: {
    title: 'Gut & Inflammatory Stress',
    copy: 'For GI integrity, inflammatory burden, appetite disruption, skin-gut axis conversations, and sensitive cases.',
    tags: ['KPV', 'BPC-157']
  },
  skin: {
    title: 'Skin, Coat & Wound Support',
    copy: 'For dermal quality, coat condition, barrier integrity, irritation support, and tissue repair research categories.',
    tags: ['GHK-Cu', 'KPV']
  },
  performance: {
    title: 'Performance & Longevity',
    copy: 'For working dogs, sport horses, senior animals, and long-term recovery optimization under veterinary direction.',
    tags: ['Epitalon', 'Thymosin', 'Recovery Stack']
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  observer.observe(item);
});

window.addEventListener('mousemove', (event) => {
  if (!cursorLight) return;
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

window.addEventListener('scroll', () => {
  if (!topbar) return;
  topbar.style.background = window.scrollY > 80 ? 'rgba(2,3,4,.91)' : 'rgba(2,3,4,.72)';
});

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const selected = conditionData[card.dataset.condition];
    if (!selected) return;
    cards.forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    title.textContent = selected.title;
    copy.textContent = selected.copy;
    tags.innerHTML = selected.tags.map((tag) => `<span>${tag}</span>`).join('');
  });
});

const accessButton = document.querySelector('.access-form .btn');
if (accessButton) {
  accessButton.addEventListener('click', () => {
    accessButton.textContent = 'Request Captured';
  });
}
