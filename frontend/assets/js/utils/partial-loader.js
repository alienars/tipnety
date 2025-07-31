export async function loadPartials() {
  const elements = document.querySelectorAll('[data-include]');
  if (elements.length === 0) return;

  const modules = import.meta.glob('/partials/**/*.html', {
    eager: true,
    query: '?raw'
  });

  Array.from(elements).forEach(el => {
    const path = el.getAttribute('data-include');
    if (modules[path]) {
      el.innerHTML = modules[path].default;
      el.removeAttribute('data-include');
    } else {
      console.error('Partial not found:', path);
    }
  });

  if (document.querySelectorAll('[data-include]').length > 0) {
    await loadPartials();
  }
}
