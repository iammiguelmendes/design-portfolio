/* ============================================================
   projects.js — Filter & Grid Interactions
   ============================================================ */

(function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');
  const countEl = document.getElementById('count');
  const empty   = document.getElementById('emptyState');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach((card, i) => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animationDelay = (i * 0.05) + 's';
          card.style.animation = 'none';
          // Force reflow then re-apply animation
          void card.offsetWidth;
          card.style.animation = '';
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (countEl) countEl.textContent = visible;
      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    });
  });
})();
