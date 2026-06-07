const revealItems = document.querySelectorAll('.reveal');
const cursorLight = document.querySelector('.cursor-light');
const topbar = document.querySelector('.topbar');
const speciesButtons = document.querySelectorAll('.species-btn');
const conditionRows = document.querySelectorAll('.condition-row');
const speciesOutput = document.getElementById('species-output');
const conditionOutput = document.getElementById('condition-output');
const resultCopy = document.getElementById('result-copy');
const resultTags = document.getElementById('result-tags');

const conditionData = {
  joint: {
    label: 'Joint degeneration + mobility decline',
    copy: 'A vet-directed pathway for mobility decline, senior animal comfort, sport load, and joint recovery support conversations.',
    tags: ['BPC-157', 'TB-500', 'KPV']
  },
  soft: {
    label: 'Tendon, ligament + soft tissue stress',
    copy: 'A recovery pathway for high-load tissue stress, CCL conversations, equine tendon demand, and structured rehabilitation support.',
    tags: ['TB-500', 'Thymosin β4', 'BPC-157']
  },
  gut: {
    label: 'Gut integrity + inflammatory burden',
    copy: 'A professional pathway for GI integrity, inflammatory stress, appetite disruption, sensitive animals, and skin-gut axis cases.',
    tags: ['KPV', 'BPC-157']
  },
  skin: {
    label: 'Skin, coat + wound-support category',
    copy: 'A tissue-quality pathway for dermal barrier support, coat condition, irritation support, and wound-support research categories.',
    tags: ['GHK-Cu', 'KPV']
  },
  longevity: {
    label: 'Performance longevity + recovery optimization',
    copy: 'A performance pathway for working animals, sport horses, senior pets, and long-horizon recovery optimization under veterinary judgment.',
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
  item.style.transitionDelay = `${Math.min(index * 42, 240)}ms`;
  observer.observe(item);
});

window.addEventListener('mousemove', (event) => {
  if (!cursorLight) return;
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

window.addEventListener('scroll', () => {
  if (!topbar) return;
  topbar.style.background = window.scrollY > 80 ? 'rgba(2,6,8,.94)' : 'rgba(2,6,8,.82)';
});

speciesButtons.forEach((button) => {
  button.addEventListener('click', () => {
    speciesButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    speciesOutput.textContent = button.dataset.species;
  });
});

conditionRows.forEach((row) => {
  row.addEventListener('click', () => {
    const selected = conditionData[row.dataset.condition];
    if (!selected) return;
    conditionRows.forEach((item) => item.classList.remove('active'));
    row.classList.add('active');
    conditionOutput.textContent = selected.label;
    resultCopy.textContent = selected.copy;
    resultTags.innerHTML = selected.tags.map((tag) => `<span>${tag}</span>`).join('');
  });
});

const accessButton = document.querySelector('.access-form .cta');
if (accessButton) {
  accessButton.addEventListener('click', () => {
    accessButton.textContent = 'Verification Request Captured';
  });
}
