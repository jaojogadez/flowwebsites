/**
 * reveal.js
 * Inicia o IntersectionObserver para elementos com a classe .reveal
 * Criando o efeito de Fade-Up em componentes quando entram na tela.
 */

export function initReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-scale');

    if (!reveals.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Revela logo antes de cruzar o meio da tela
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Usa classList add em vez de toggle para evitar toggle bugs
                entry.target.classList.add('revealed');
            } else {
                // Anima "desligando" quando sai do viewport para o re-scroll ser impactante também
                entry.target.classList.remove('revealed');
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}
