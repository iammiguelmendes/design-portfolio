/* ============================================================
   contact.js — Form Interactions & Validation
   ============================================================ */

/* ── Subject Chips ─────────────────────────────────────────── */
(function initSubjectChips() {
  const chips  = document.querySelectorAll('.subject-chip');
  const hidden = document.getElementById('subject');
  if (!chips.length || !hidden) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      hidden.value = chip.dataset.value;
    });
  });
})();

/* ── Character Counter ─────────────────────────────────────── */
(function initCharCounter() {
  const textarea = document.getElementById('message');
  const counter  = document.getElementById('charCount');
  if (!textarea || !counter) return;

  const MAX = 800;
  textarea.setAttribute('maxlength', MAX);

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = len;
    counter.style.color = len > MAX * 0.9
      ? (len >= MAX ? '#ef4444' : '#f59e0b')
      : '';
  });
})();

/* ── Form Validation & Submission ──────────────────────────── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const reset   = document.getElementById('resetForm');
  const submit  = form ? form.querySelector('.submit-btn') : null;
  if (!form) return;

  function validate() {
    let valid = true;

    // Name
    const name    = document.getElementById('name');
    const nameErr = document.getElementById('nameError');
    if (!name.value.trim()) {
      nameErr.textContent = 'Please enter your name.';
      name.classList.add('error');
      valid = false;
    } else {
      nameErr.textContent = '';
      name.classList.remove('error');
    }

    // Email
    const email    = document.getElementById('email');
    const emailErr = document.getElementById('emailError');
    const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value.trim())) {
      emailErr.textContent = 'Please enter a valid email address.';
      email.classList.add('error');
      valid = false;
    } else {
      emailErr.textContent = '';
      email.classList.remove('error');
    }

    // Message
    const msg    = document.getElementById('message');
    const msgErr = document.getElementById('messageError');
    if (msg.value.trim().length < 20) {
      msgErr.textContent = 'Please write at least 20 characters.';
      msg.classList.add('error');
      valid = false;
    } else {
      msgErr.textContent = '';
      msg.classList.remove('error');
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate sending
    submit.classList.add('loading');
    submit.disabled = true;

    setTimeout(() => {
      submit.classList.remove('loading');
      submit.disabled = false;
      form.style.display = 'none';
      if (success) success.style.display = 'flex';
    }, 1800);
  });

  // Reset form
  if (reset) {
    reset.addEventListener('click', () => {
      form.reset();
      document.getElementById('charCount').textContent = '0';
      if (success) success.style.display = 'none';
      form.style.display = 'flex';
    });
  }

  // Live validation on blur
  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', validate);
  });
})();
