// main-slim/assets/js/components/notifications.js

export function notificationStore() {
    return {
        items: [],
        counter: 0,

        add(notification) {
            const id = this.counter++;
            const duration = notification.duration === 0 
                ? Infinity 
                : (notification.duration || 5000);

            // هر نوتیفیکیشن یک فِلَگ closing دارد
            const item = { id, ...notification, closing: false };
            this.items.push(item);

            if (duration !== Infinity) {
                setTimeout(() => this.remove(id), duration);
            }
        },

        remove(id) {
            // مرحله اول: ست کردن closing برای پخش انیمیشن leave
            const idx = this.items.findIndex(i => i.id === id);
            if (idx === -1) return;
            this.items[idx].closing = true;

            // مرحله دوم: پس از ۵۰۰ms (مطابق duration-500) حذف واقعی از آرایه
            setTimeout(() => {
                this.items = this.items.filter(i => i.id !== id);
            }, 500);
        },

        // helper‌ها
        success(title, message, duration) {
            this.add({ type: 'success', title, message, duration });
        },
        error(title, message, duration) {
            this.add({ type: 'error', title, message, duration });
        },
        warning(title, message, duration) {
            this.add({ type: 'warning', title, message, duration });
        },
    };
}
