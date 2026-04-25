/**
 * contact-modal.js – Contact Modal Manager
 * Gerencia abertura, fechamento e interações do modal de contato
 */

export function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('contact-modal-close');
    const form = document.getElementById('contact-form');
    const overlay = document.querySelector('.contact-modal__overlay');

    if (!modal) return;

    /**
     * Abre o modal com animação
     */
    function openModal() {
        modal.classList.add('open');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        // Foca no primeiro input
        setTimeout(() => {
            const firstInput = form.querySelector('input, textarea');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    /**
     * Fecha o modal com animação
     */
    function closeModal() {
        modal.classList.remove('open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    /**
     * Event Listeners
     */

    // Botões que abrem o modal (links com href="#contato")
    const contactTriggers = document.querySelectorAll('a[href="#contato"], button[data-contact]');
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Botão fechar
    closeBtn?.addEventListener('click', closeModal);

    // Overlay (fechar ao clicar)
    overlay?.addEventListener('click', closeModal);

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Submissão do formulário
    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Log dos dados (em produção, enviar para servidor)
        console.log('Formulário submetido:', data);

        // Simula envio com feedback visual
        const submitBtn = form.querySelector('.contact-form__submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simula delay de 2 segundos
        setTimeout(() => {
            submitBtn.textContent = 'Enviado!';
            submitBtn.style.background = 'linear-gradient(135deg, #00d26a 0%, #1a9c52 100%)';
            
            // Reset após 2 segundos
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                closeModal();
            }, 2000);
        }, 2000);
    });

    // Retorna funções públicas
    return {
        open: openModal,
        close: closeModal
    };
}

// Exporta como global se necessário
window.contactModal = initContactModal;
