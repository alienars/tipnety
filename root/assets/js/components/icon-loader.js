// assets/js/components/icon-loader.js
export function loadIcons() {
  document.querySelectorAll('i-con:not([data-loaded="true"])').forEach(async (iconElement) => {
    iconElement.dataset.loaded = 'true';
    const iconName = iconElement.getAttribute('name') || iconElement.getAttribute('data-icon');
    if (!iconName) return;
    try {
      if (iconName.toLowerCase().endsWith('.png')) {
        const img = document.createElement('img');
        img.src = `/assets/icons/${iconName}`;
        img.alt = iconElement.getAttribute('alt') || iconName.replace('.png', '');
        img.setAttribute('aria-hidden', 'true');
        img.setAttribute('role', 'img');
        img.className = 'w-full h-full object-contain';
        iconElement.innerHTML = '';
        iconElement.appendChild(img);
      } else {
        const response = await fetch(`/assets/icons/${iconName}.svg`);
        if (!response.ok) throw new Error(`Icon not found: ${iconName}`);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgNode = svgDoc.documentElement;
        svgNode.setAttribute('aria-hidden', 'true');
        svgNode.setAttribute('role', 'img');
        svgNode.setAttribute('class', 'w-full h-full');
        iconElement.innerHTML = '';
        iconElement.appendChild(svgNode);
      }
    } catch (error) {
      console.error('Error loading icon:', error);
      iconElement.innerHTML = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', loadIcons);
const observer = new MutationObserver((mutations) => {
  if (mutations.some(mutation => mutation.addedNodes.length > 0 && mutation.target.nodeType === 1)) {
    loadIcons();
  }
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});