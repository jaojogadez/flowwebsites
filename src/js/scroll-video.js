/**
 * scroll-video.js
 * Reproduz o vídeo de impacto automaticamente uma única vez
 * quando ele entra no campo de visão do usuário.
 */

export function initScrollVideo() {
    const video = document.getElementById('impact-video');

    if (!video) return;

    // Garante que não irá iterar mais de uma vez
    let hasPlayed = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasPlayed) {
                hasPlayed = true;
                
                // Tenta reproduzir o vídeo. Pode falhar se for restrito por data-saving/low-power mode
                video.play().catch(err => {
                    console.warn("Auto-play prevenido pelas políticas do navegador.", err);
                });

                // Para de observar o vídeo
                observer.unobserve(video);
            }
        });
    }, {
        threshold: 0.2 // Toca quando pelo menos 20% do vídeo estiver na tela
    });

    observer.observe(video);
}
