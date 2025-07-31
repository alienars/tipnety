export function initHeader() {
    // ===================================================================
    // منطق مودال جستجو
    // ===================================================================
    const searchModal = document.getElementById('search-modal');
    if (searchModal) {
        const desktopSearchInput = document.getElementById('desktop-search-input');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        const closeSearchModalButton = document.getElementById('close-search-modal');
        let popularCategoriesSlider;

        const openSearchModal = () => {
            searchModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            if (!popularCategoriesSlider) {
                setTimeout(() => {
                    popularCategoriesSlider = new Swiper('.popular-categories-slider', {
                        modules: [window.SwiperModules.Navigation],
                        loop: false, spaceBetween: 16, slidesPerView: 2.5,
                        navigation: { nextEl: '.popular-categories-next', prevEl: '.popular-categories-prev' },
                        observer: true, observeParents: true,
                        breakpoints: { 640: { slidesPerView: 4 }, 768: { slidesPerView: 5 }, 1024: { slidesPerView: 6 } }
                    });
                }, 100);
            }
        };
        const closeSearchModal = () => {
            searchModal.classList.add('hidden');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('translate-x-full')) {
                document.body.style.overflow = '';
            }
        };
        desktopSearchInput?.addEventListener('focus', openSearchModal);
        mobileSearchInput?.addEventListener('focus', openSearchModal);
        closeSearchModalButton?.addEventListener('click', closeSearchModal);
    }

    // ===================================================================
    // منطق منوی موبایل (Off-canvas)
    // ===================================================================
    const hamburgerButton = document.getElementById('hamburger-button');
    if (hamburgerButton) {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');
        
        const openMobileMenu = () => {
            mobileMenu?.classList.remove('translate-x-full');
            mobileMenuOverlay?.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };
        const closeMobileMenu = () => {
            mobileMenu?.classList.add('translate-x-full');
            mobileMenuOverlay?.classList.add('hidden');
            if (searchModal && searchModal.classList.contains('hidden')) {
                document.body.style.overflow = '';
            }
        };
        hamburgerButton.addEventListener('click', openMobileMenu);
        closeMobileMenuButton?.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

        // منطق تب‌ها و آکاردئون داخل منو
        document.querySelectorAll('.mobile-category-item').forEach(item => {
            item.addEventListener('click', () => {
                const targetCategory = item.getAttribute('data-category');
                document.querySelectorAll('.mobile-category-item').forEach(i => i.classList.remove('mobile-category-active'));
                item.classList.add('mobile-category-active');
                document.querySelectorAll('.mobile-category-content').forEach(content => {
                    content.classList.toggle('hidden', content.id !== `${targetCategory}-content`);
                });
            });
        });
        document.querySelectorAll('.accordion-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.nextElementSibling?.classList.toggle('hidden');
                toggle.querySelector('svg')?.classList.toggle('rotate-180');
            });
        });
    }
}
