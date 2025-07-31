// assets/js/components/icon-loader.js
// تنظیمات افکت اسکلتون آیکن‌ها
export const iconLoaderConfig = {
  // برای غیرفعال کردن اسکلتون می‌توانید مقدار این متغیر را false قرار دهید
  enabled: true,
  // تاخیر نمایش آیکن بعد از لود شدن (بر حسب میلی ثانیه)
  delay: 0,
};

// اگر مقادیر در window تعریف شده باشد، آن‌ها را جایگزین می‌کنیم
if (typeof window !== 'undefined') {
  if (window.iconSkeletonEnabled !== undefined) {
    iconLoaderConfig.enabled = window.iconSkeletonEnabled;
  }
  if (window.iconSkeletonDelay !== undefined) {
    iconLoaderConfig.delay = window.iconSkeletonDelay;
  }
}

export function loadIcons() {
  document.querySelectorAll('i-con:not([data-loaded])').forEach(async (iconElement) => {
    const iconName = iconElement.getAttribute('name') || iconElement.getAttribute('data-icon');
    if (!iconName) return;

    iconElement.dataset.loaded = iconLoaderConfig.enabled ? 'loading' : 'pending';

    let placeholder;
    if (iconLoaderConfig.enabled) {
      placeholder = document.createElement('span');
      placeholder.className = 'icon-placeholder';
      iconElement.innerHTML = '';
      iconElement.appendChild(placeholder);
    } else {
      iconElement.innerHTML = '';
    }

    try {
      const replaceIcon = (node) => {
        const action = () => {
          if (iconLoaderConfig.enabled) {
            placeholder.replaceWith(node);
          } else {
            iconElement.appendChild(node);
          }
          requestAnimationFrame(() => node.classList.remove('opacity-0'));
          iconElement.dataset.loaded = 'true';
        };
        if (iconLoaderConfig.enabled && iconLoaderConfig.delay > 0) {
          setTimeout(action, iconLoaderConfig.delay);
        } else {
          action();
        }
      };

      if (iconName.toLowerCase().endsWith('.png')) {
        const img = new Image();
        img.src = `/assets/icons/${iconName}`;
        img.alt = iconElement.getAttribute('alt') || iconName.replace('.png', '');
        img.setAttribute('aria-hidden', 'true');
        img.setAttribute('role', 'img');
        img.className = 'w-full h-full object-contain opacity-0 transition-opacity duration-300';
        img.onload = () => replaceIcon(img);
      } else {
        const response = await fetch(`/assets/icons/${iconName}.svg`);
        if (!response.ok) throw new Error(`Icon not found: ${iconName}`);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgNode = svgDoc.documentElement;
        svgNode.setAttribute('aria-hidden', 'true');
        svgNode.setAttribute('role', 'img');
        svgNode.setAttribute('class', 'w-full h-full opacity-0 transition-opacity duration-300');
        replaceIcon(svgNode);
      }
    } catch (error) {
      console.error('Error loading icon:', error);
      iconElement.innerHTML = '';
      iconElement.dataset.loaded = 'error';
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
