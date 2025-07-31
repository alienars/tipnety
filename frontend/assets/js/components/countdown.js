export function initCountdowns() {
    document.querySelectorAll('.countdown-timer').forEach(countdownContainer => {
        const timeSpans = {
            hours: countdownContainer.querySelector('[data-time="hours"]'),
            minutes: countdownContainer.querySelector('[data-time="minutes"]'),
            seconds: countdownContainer.querySelector('[data-time="seconds"]'),
        };

        // اگر یکی از المان‌های زمان وجود نداشت، ادامه نده
        if (!timeSpans.hours || !timeSpans.minutes || !timeSpans.seconds) return;

        // یک زمان رندوم برای مثال (مثلا ۲ ساعت و ۴۸ دقیقه دیگر)
        const endTime = new Date().getTime() + (2 * 60 * 60 * 1000) + (48 * 60 * 1000) + (24 * 1000);
        
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                countdownContainer.innerHTML = "<span class='text-red-500 font-bold'>پایان یافت!</span>";
                return;
            }

            const h = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const m = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const s = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

            timeSpans.hours.textContent = h;
            timeSpans.minutes.textContent = m;
            timeSpans.seconds.textContent = s;
        }, 1000);
    });
}
