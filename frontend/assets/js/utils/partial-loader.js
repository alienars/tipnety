export async function loadPartials() {
  const elements = document.querySelectorAll('[data-include]');
  if (elements.length === 0) return;

  const modules = import.meta.glob('/partials/**/*.html', { query: '?raw' });
  await Promise.all(
    Array.from(elements).map(async el => {
      const path = el.getAttribute('data-include');
      if (modules[path]) {
        const m = await modules[path]();
        el.innerHTML = m.default;
        el.removeAttribute('data-include');
      } else {
        console.error('Partial not found:', path);
      }
    })
  );

  if (document.querySelectorAll('[data-include]').length > 0) {
    await loadPartials();
  }
}
