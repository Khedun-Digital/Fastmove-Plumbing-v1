document.addEventListener('DOMContentLoaded', () => {
  const smsNumber = '0790485777';
  const forms = document.querySelectorAll('form[data-sms-intro]');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const intro = form.dataset.smsIntro?.trim() || 'Fastmove Plumbing enquiry';
      const messageLines = [intro];

      form.querySelectorAll('input, select, textarea').forEach((field) => {
        if (field.type === 'submit' || field.disabled) {
          return;
        }

        let value = (field.value || '').trim();
        if (field.tagName === 'SELECT') {
          const selectedOption = field.options[field.selectedIndex];
          if (!selectedOption || !selectedOption.value) {
            value = '';
          } else {
            value = selectedOption.text.trim();
          }
        }

        if (!value) {
          return;
        }

        const label = field.dataset.smsLabel
          || field.getAttribute('aria-label')
          || field.getAttribute('placeholder')
          || field.name
          || field.id
          || 'Field';

        messageLines.push(`${label}: ${value}`);
      });

      const body = encodeURIComponent(messageLines.join('\n'));
      const smsUrl = `sms:${smsNumber}?body=${body}`;

      window.location.href = smsUrl;
    });
  });

  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mnav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileNav.classList.toggle('hidden');
    });
  }
});
