/**
 * scroll-video.js
 * Sincroniza o `currentTime` de um elemento <video> com o scroll da seção pai.
 */

export function initScrollVideo() {
    const section = document.querySelector('.impact');
    const video = document.getElementById('impact-video');

    if (!section || !video) return;

    // Em alguns navegadores mobile o 'muted' não permite scrubbing sem user interaction
    // Certificando q o video tem estado pausado sempre.
    video.pause();

    let rafId = null;
    let targetTime = 0;
    let actTime = 0;

    // Loop de animação contínuo (Lerp) para scrubber fluído (premium vibe)
    const renderLoop = () => {
        if (!isNaN(video.duration) && isFinite(video.duration)) {
            // Lerp (interpolação linear) para suavizar o scrub do vídeo
            actTime += (targetTime - actTime) * 0.1;
            
            // Impede atualização minúscula q causa overhead
            if (Math.abs(actTime - video.currentTime) > 0.01) {
                try {
                    video.currentTime = actTime;
                } catch(e) { } // previne erros de state no Safari
            }
        }
        requestAnimationFrame(renderLoop);
    };
    
    requestAnimationFrame(renderLoop);

    const onScroll = () => {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            const rect = section.getBoundingClientRect();
            
            // Quantidade de pixels rolada 'para dentro' da section
            const scrolledPx = -rect.top; 
            const totalScrollablePx = rect.height - window.innerHeight; 

            if (totalScrollablePx > 0) {
                let progress = scrolledPx / totalScrollablePx;
                progress = Math.max(0, Math.min(progress, 1));
                
                if (video.duration && isFinite(video.duration)) {
                    targetTime = video.duration * progress;
                }
            }
            
            rafId = null;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    
    // Chamada inicial
    setTimeout(onScroll, 100);
}
