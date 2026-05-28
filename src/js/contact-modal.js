/**
 * contact-modal.js – Contact Modal Manager (Redesign)
 * Gerencia abertura, fechamento e funcionalidade real do modal de contato
 * Integração com WhatsApp para conversão
 */

export function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('contact-modal-close');
    const form = document.getElementById('contact-form');
    const overlay = document.querySelector('.contact-modal__overlay');

    if (!modal || !form) return;

    // Configuração do número WhatsApp
    const WHATSAPP_NUMBER = '5500000000000'; // Substitua com o número real

    /**
     * Abre o modal com animação
     */
    function openModal() {
        modal.classList.add('open');
        
        // Prevenir scroll do body, mas permitir scroll do modal
        const scrollY = window.scrollY;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        
        // Foca no primeiro input com pequeno delay
        setTimeout(() => {
            const firstInput = form.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
                // Scroll até o primeiro input no modal se necessário
                form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 200);
    }

    /**
     * Fecha o modal com animação
     */
    function closeModal() {
        modal.classList.remove('open');
        
        // Restaurar scroll do body
        const scrollY = document.body.style.top;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        
        // Restaurar posição original
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }

    /**
     * Formata mensagem para WhatsApp
     * @param {Object} data - Dados do formulário
     * @returns {string} - Mensagem formatada
     */
    function formatWhatsAppMessage(data) {
        const { name, phone, project, message } = data;
        
        let whatsappMessage = `Olá! Vim pelo site da Flow Web Sites.\n\n`;
        whatsappMessage += `*Nome:* ${name || 'Não informado'}\n`;
        whatsappMessage += `*Telefone:* ${phone || 'Não informado'}\n`;
        whatsappMessage += `*Tipo de Projeto:* ${getProjectLabel(project)}\n`;
        
        if (message && message.trim()) {
            whatsappMessage += `*Mensagem:* ${message}\n`;
        }

        return whatsappMessage;
    }

    /**
     * Retorna o label do tipo de projeto
     * @param {string} value - Valor do select
     * @returns {string} - Label legível
     */
    function getProjectLabel(value) {
        const labels = {
            'landing-page': 'Landing Page',
            'site-institucional': 'Site Institucional',
            'loja-virtual': 'Loja Virtual',
            'redesign': 'Redesign de Site',
            'nao-sei': 'Ainda não sei'
        };
        return labels[value] || 'Não especificado';
    }

    /**
     * Abre WhatsApp com mensagem pré-formatada
     * @param {string} message - Mensagem a enviar
     */
    function openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }

    /**
     * Valida o formulário
     * @returns {boolean} - True se válido
     */
    function validateForm(formData) {
        const { name, phone, project } = formData;

        if (!name || name.trim().length < 2) {
            alert('Por favor, digite seu nome completo.');
            return false;
        }

        if (!phone || phone.trim().length < 10) {
            alert('Por favor, digite um WhatsApp válido.');
            return false;
        }

        if (!project) {
            alert('Por favor, selecione um tipo de projeto.');
            return false;
        }

        return true;
    }

    /**
     * Submissão do formulário
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Valida dados
        if (!validateForm(data)) {
            return;
        }

        // Formata mensagem para WhatsApp
        const whatsappMessage = formatWhatsAppMessage(data);

        // Obtém botão de envio
        const submitBtn = form.querySelector('.contact-form__submit');
        const originalHTML = submitBtn.innerHTML;
        const originalText = submitBtn.textContent;

        // Feedback visual: Enviando
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="contact-form__submit-text">Abrindo WhatsApp...</span>';

        // Abre WhatsApp após pequeno delay para melhor UX
        setTimeout(() => {
            openWhatsApp(whatsappMessage);

            // Feedback visual: Enviado
            submitBtn.innerHTML = '<span class="contact-form__submit-text">✓ Sucesso!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #16a34a 0%, #0d8a38 100%)';

            // Reset do formulário e botão após 2 segundos
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Fecha modal após 2 segundos
                setTimeout(() => {
                    closeModal();
                }, 500);
            }, 2000);
        }, 300);
    });

    /**
     * Event Listeners
     */

    // Botões que abrem o modal (links com href="#contato" ou atributo data-contact)
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
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    /**
     * Input Focus Behavior
     * Remove mensagens de erro ao focar
     */
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            // Pode ser usado para remover mensagens de erro, se implementadas
            input.classList.remove('error');
        });

        // Melhorar UX em mobile: permitir Enter para próximo campo
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
                const currentIndex = inputs.indexOf(input);
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        });
    });

    /**
     * Previne envio duplicado
     */
    let isSubmitting = false;
    form.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Melhorar submit para evitar duplicatas
    const originalSubmitHandler = form.onsubmit;
    form.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });

    /**
     * Mobile-specific improvements
     */
    if (window.matchMedia('(hover: none)').matches) {
        // Touch device - remover animações de hover
        form.classList.add('is-touch');
    }

    /**
     * Viewport height fix para mobile (teclado virtual)
     */
    let originalHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        const currentHeight = window.innerHeight;
        const heightDifference = originalHeight - currentHeight;
        
        // Se altura mudou significativamente, teclado abriu
        if (heightDifference > 100 && modal.classList.contains('open')) {
            // Ajustar scroll
            setTimeout(() => {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.tagName !== 'HTML' && activeElement.tagName !== 'BODY') {
                    activeElement.scrollIntoView({ block: 'nearest', behavior: 'auto' });
                }
            }, 100);
        }
    });

    // Retorna funções públicas
    return {
        open: openModal,
        close: closeModal,
        isOpen: () => modal.classList.contains('open')
    };
}

// Inicializa ao carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactModal);
} else {
    initContactModal();
}

// Exporta como global se necessário
window.contactModal = initContactModal;
