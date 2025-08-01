// main.js

import Alpine from "alpinejs";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade, Grid } from "swiper/modules";

// استایل‌های Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/css/autoplay";

// ایمپورت‌های دیگر پروژه
import { authForm, initAuthPage } from "./pages/auth.js";
import { initHeader } from "./components/header.js";
import { initSliders } from "./components/sliders.js";
import { initCountdowns } from "./components/countdown.js";
import { notificationStore } from "./components/notifications.js";
import { loadIcons } from './components/icon-loader.js';
import { loadPartials } from './utils/partial-loader.js';

// ===================================================================
// ۱) اتصال گلوبالِ کتابخانه‌ها
// ===================================================================
window.Alpine = Alpine;
window.Swiper = Swiper;
window.SwiperModules = { Navigation, Pagination, Autoplay, EffectFade, Grid };
Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Grid]);

// ===================================================================
// ۲) ثبت کامپوننت‌های Alpine
// ===================================================================
Alpine.data("authForm", authForm);
Alpine.store("notifications", notificationStore());


// ===================================================================
// تابع برای مدیریت هدرهای داینامیک صفحات
// ===================================================================
function initPageHeaders() {
  // از اتریبیوت data-active-page که همیشه وجود دارد برای پیدا کردن والد استفاده می‌کنیم
  const wrapper = document.querySelector('[data-active-page]');
  if (!wrapper) return;

  const { title, description, activePage } = wrapper.dataset;
  if (!title) return;

  const titleEls = wrapper.querySelectorAll('.page-header-title');
  const descriptionEl = wrapper.querySelector('.page-header-description');
  const navContainer = wrapper.querySelector('.page-header-nav');

  titleEls.forEach(el => el.innerText = title);
  if (descriptionEl) descriptionEl.innerText = description;

  if (activePage && navContainer) {
    const activeLink = navContainer.querySelector(`a[data-page="${activePage}"]`);
    if (activeLink) {
      activeLink.classList.remove('border-white/50', 'text-white', 'hover:bg-white/10', 'hover:border-white');
      activeLink.classList.add('bg-white', 'text-gray-900', 'border-white');
    }
  }
}


// ===================================================================
// تابع initializeApp: بعد از لود partialها اجرا می‌شود
// ===================================================================
function initializeApp() {
  console.log("All partials loaded. Initializing app components...");
  const page = document.body.dataset.page || "";
  loadIcons();
  initHeader();
  initSliders();
  initCountdowns();
  initPageHeaders();
  if (page === "auth") {
    initAuthPage();
  }
}

// ===================================================================
// نقطه‌ی شروع برنامه
// ===================================================================
document.addEventListener("DOMContentLoaded", async () => {
  await loadPartials();
  initializeApp();
  Alpine.start();
});
