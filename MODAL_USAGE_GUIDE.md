# 📱 GUIA DE USO - Modal Redesenhado

## ⚙️ Configuração Necessária

### 1. **Adicione seu Número WhatsApp**

No arquivo `/src/js/contact-modal.js`, linha 13:

```javascript
// ANTES:
const WHATSAPP_NUMBER = '5500000000000';

// DEPOIS (seu número):
const WHATSAPP_NUMBER = '5511987654321'; // Exemplo: São Paulo, Brasil
```

**Formato:**
- Use código do país (55 para Brasil)
- Use código de área (11 para São Paulo)
- Use número celular (9 dígitos)
- **SEM** hífens, parênteses ou espaços

**Exemplos válidos:**
- 🇧🇷 Brasil: `5511987654321`
- 🇺🇸 EUA: `12125551234`
- 🇲🇽 México: `525551234567`

---

## 🎯 Como Funciona

### **Fluxo do Usuário**

```
1. Usuário clica em "Solicitar Orçamento" ou botão que abre modal
   ↓
2. Modal abre com animação suave
   ↓
3. Usuário preenche:
   - Nome
   - WhatsApp
   - Tipo de Projeto (select)
   - Mensagem (opcional)
   ↓
4. Clica "SOLICITAR ORÇAMENTO"
   ↓
5. Validação de dados
   ↓
6. Modal mostra "Abrindo WhatsApp..."
   ↓
7. WhatsApp abre automaticamente com mensagem pré-formatada
   ↓
8. Modal mostra "✓ Sucesso!" por 2 segundos
   ↓
9. Modal fecha automaticamente
```

---

## 💬 Exemplo de Mensagem Enviada

```
Olá! Vim pelo site da Flow Web Sites.

Nome: João Silva
Telefone: (11) 98765-4321
Tipo de Projeto: Landing Page
Mensagem: Preciso de uma landing page para meu novo produto de tecnologia
```

---

## 🎨 Personalizações Possíveis

### **Alterar Título do Modal**
Arquivo: `index.html`, linha ~482

```html
<!-- ANTES -->
<h2 class="contact-modal__title">Vamos conversar?</h2>

<!-- DEPOIS -->
<h2 class="contact-modal__title">Seu novo título aqui</h2>
```

### **Alterar Cores Principais**
Arquivo: `/src/css/contact-modal.css`, linhas 10-20

```css
:root {
    --primary-blue: #0062ff;        /* Cor principal */
    --accent-blue: #3b82f6;         /* Cor de destaque */
    --success-green: #25d366;       /* Cor WhatsApp */
    /* ... */
}
```

### **Alterar Benefícios Listados**
Arquivo: `index.html`, linhas 554-568

```html
<ul class="contact-modal__benefits-list">
    <li class="contact-modal__benefit-item">
        <span class="contact-modal__benefit-icon">✓</span>
        <span class="contact-modal__benefit-text">Seu benefício aqui</span>
    </li>
    <!-- Adicione mais itens -->
</ul>
```

### **Alterar Opções de Tipo de Projeto**
Arquivo: `index.html`, linhas 498-505

```html
<select id="contact-project" name="project" class="contact-form__select" required>
    <option value="">Selecione uma opção</option>
    <option value="landing-page">Landing Page</option>
    <option value="sua-opcao">Sua Opção</option>
    <!-- Adicione mais opções -->
</select>
```

---

## 🔗 Disparadores do Modal

### **Abrir por Link**
```html
<a href="#contato">Abrir Modal</a>
```

### **Abrir por Botão**
```html
<button data-contact>Abrir Modal</button>
```

### **Abrir via JavaScript**
```javascript
// Obter instância do modal
const modal = window.contactModal();

// Abrir
modal.open();

// Fechar
modal.close();

// Verificar se está aberto
if (modal.isOpen()) {
    console.log('Modal está aberto');
}
```

---

## 🎬 Animações Principais

### **1. Fade-In Cascata**
- Cada elemento entra com delay
- Cria efeito de elegância
- Duração: 0.6s

### **2. Logo Flutuante**
- Animação contínua suave
- Pausa: 4s
- Amplitude: ±10px

### **3. Underline em Inputs**
- Aparece ao focar
- Gradiente azul
- Duração: 0.4s

### **4. Hover Buttons**
- Elevação: -3px (transform Y)
- Glow aumenta
- Duração: 0.3s

---

## 📊 Métricas a Rastrear

### **Analytics Recomendadas**

```javascript
// Quando modal abre
gtag('event', 'modal_open', {
    'event_category': 'engagement',
    'event_label': 'contact_modal'
});

// Quando usuário envia
gtag('event', 'form_submit', {
    'event_category': 'conversion',
    'event_label': 'contact_form',
    'value': 'whatsapp_opened'
});

// Quando WhatsApp abre
gtag('event', 'whatsapp_link_clicked', {
    'event_category': 'conversion',
    'event_label': 'contact_modal_whatsapp'
});
```

---

## 🐛 Troubleshooting

### **Modal não abre**
1. Verifique se `id="contact-modal"` existe no HTML
2. Verifique se o CSS está importado em `index.css`
3. Verifique se o JS está importado no `index.html`

### **WhatsApp não abre**
1. Verifique se o número está no formato correto (sem hífens)
2. Teste direto: `https://wa.me/5511987654321`
3. Certifique-se de ter WhatsApp instalado (web ou app)

### **Validação está muito rigorosa**
- Nome: Mínimo 2 caracteres (edite no `contact-modal.js`, linha 60)
- WhatsApp: Mínimo 10 dígitos (edite no `contact-modal.js`, linha 64)

### **Estilos não aplicam**
1. Limpe cache do navegador (Ctrl+Shift+Del)
2. Verifique se o arquivo CSS está em `/src/css/contact-modal.css`
3. Verifique se há `@import "./contact-modal.css"` em `index.css`

---

## 📱 Testes de Responsividade

### **Desktop (1920px)**
- 2 colunas lado a lado
- Espaçamento máximo
- Hoveres completos

### **Tablet (768px)**
- 1 coluna com espaçamento balanceado
- Logo visível
- CTAs maiores

### **Mobile (375px)**
- Layout vertical otimizado
- Inputs com 14px (evita zoom iOS)
- Botões ocupam toda largura
- Logo reduzida

### **Teste com DevTools**
```
Chrome/Edge: F12 → Toggle device toolbar (Ctrl+Shift+M)
Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)
```

---

## ✅ Checklist Final

- [ ] Número WhatsApp configurado
- [ ] Modal abre/fecha corretamente
- [ ] Formulário valida dados
- [ ] WhatsApp abre com mensagem
- [ ] Testado em desktop, tablet, mobile
- [ ] Animações funcionando
- [ ] ESC fecha modal
- [ ] Click overlay fecha modal
- [ ] Logo animando
- [ ] Benefícios visíveis
- [ ] Prova social visível
- [ ] Feedback visual funcionando

---

## 🎓 Arquivos Modificados

1. **`/index.html`** - Nova estrutura HTML do modal
2. **`/src/css/contact-modal.css`** - CSS premium e responsivo
3. **`/src/js/contact-modal.js`** - JS com integração WhatsApp

---

## 📞 Suporte

Perguntas sobre o redesign? Verifique:
1. `MODAL_REDESIGN_SUMMARY.md` - Resumo executivo
2. Este arquivo - Guia técnico
3. Comentários no código - Explicações inline

---

**Redesign completo e funcional ✨**

*Última atualização: 27 de Maio de 2025*
