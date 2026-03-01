import { defineComponent, themeSignal } from '/src/core/engine.js';

defineComponent('sn-theme-toggle', () => {
    const sun = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const moon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    return {
        template: /*html*/`
            <button class="p-2 rounded-full cursor-pointer bg-glass border-glass text-dark transition" id="theme-btn" style="background:transparent; border:none; color:var(--text-main);"></button>`,
        setup: (shadowDOM) => {
            const btn = shadowDOM.querySelector('#theme-btn');
            const updateIcon = (theme) => btn.innerHTML = theme === 'dark' ? moon : sun;

            const unsubscribe = themeSignal.subscribe(updateIcon);
            updateIcon(themeSignal.value);

            btn.addEventListener('click', () => {
                themeSignal.value = themeSignal.value === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', themeSignal.value);
            });

            return unsubscribe; // Prevenir fugas de memoria
        }
    };
});