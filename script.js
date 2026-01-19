document.addEventListener('DOMContentLoaded', () => {
    inicializarTooltips();
    
    // Se você tiver outros componentes dinâmicos, inicialize-os aqui
});


async function inicializarTooltips() {
    // Seleciona qualquer ícone que tenha o atributo de tooltip
    document.querySelectorAll('.info-question').forEach(icon => {
        
        icon.addEventListener('mouseenter', () => {
            const mensagem = icon.getAttribute('data-tooltip');
            
            // Alteração: Usa o pai imediato ou o container relativo mais próximo
            // para ser independente de nomes de classe como .field_col
            const container = icon.parentElement; 
            container.style.position = 'relative'; // Garante que o absoluto funcione

            // Busca qualquer elemento de entrada vinculado no mesmo container
            const input = container.querySelector('input, select, textarea');
            if (!input) return;

            // Criação do Tooltip (Reutilizável)
            let tip = container.querySelector('.tooltip-container');
            if (!tip) {
                tip = document.createElement('div');
                tip.className = 'tooltip-container';
                container.appendChild(tip);
            }
            tip.innerText = mensagem;

            // Medições
            const rectInput = input.getBoundingClientRect();
            const rectTip = tip.getBoundingClientRect();
            
            // Cálculo de alinhamento vertical centralizado
            const meioAlturaInput = rectInput.height / 2;
            const meioAlturaTip = rectTip.height / 2;
            const deslocamentoY = meioAlturaInput - meioAlturaTip;

            // Aplica alinhamento vertical
            tip.style.bottom = `${deslocamentoY}px`;

            // Lógica de Posicionamento Horizontal Genérica
            // Usamos a viewport como referência caso não haja um field-container
            const bodyWidth = document.body.clientWidth;
            const inputCentroX = rectInput.left + (rectInput.width / 2);

            // Reseta classes e estilos
            tip.classList.remove('tooltip-left', 'tooltip-right');
            tip.style.left = "auto";
            tip.style.right = "auto";

            // Se o centro do input está na metade esquerda da tela, 
            // posiciona o tooltip à direita do campo
            if (inputCentroX < bodyWidth / 2) {
                tip.classList.add('tooltip-right');
                // Alinha o início do balão com o fim do ícone ou uma margem fixa
                tip.style.left = `${icon.offsetLeft + icon.offsetWidth + 5}px`;
            } else {
                // Posiciona o tooltip à esquerda do campo
                tip.classList.add('tooltip-left');
                // Alinha o fim do balão antes do ícone
                tip.style.right = `${container.offsetWidth - icon.offsetLeft + 5}px`;
            }

            requestAnimationFrame(() => tip.classList.add('visible'));
        });

        icon.addEventListener('mouseleave', () => {
            const container = icon.parentElement;
            const tip = container.querySelector('.tooltip-container');
            if (tip) {
                tip.classList.remove('visible');
                // Opcional: remover do DOM ou apenas esconder
                setTimeout(() => tip.remove(), 300);
            }
        });
    });
}

/**
 * Inicializa botões de edição dinamicamente em containers de campos.
 * @param {string} selector - O seletor do container onde o botão deve ser inserido.
 */
function inicializarBotoesEdicao(selector = '.box-visual') {
    // Seleciona todos os containers de colunas de campo
    document.querySelectorAll(selector).forEach(container => {
        
        // Busca o campo de entrada (input, select ou time)
        const campo = container.querySelector('input, select');
        
        // Verifica se o campo existe e se o botão já não foi adicionado para evitar duplicatas
        if (campo && !container.querySelector('.edit-button')) {
            
            // 1. Cria o elemento botão
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'edit-button';
            
            // 2. Adiciona o ícone do FontAwesome (conforme seu HTML de exemplo)
            btn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            
            // 3. Adiciona o evento de clique (Exemplo genérico)
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Editando o campo: ${campo.id || campo.name}`);
                // Aqui você pode disparar uma função de abertura de modal ou habilitar o campo
            });

            // 4. Garante que o container tenha position relative para o posicionamento absolute do botão
            if (window.getComputedStyle(container).position === 'static') {
                container.style.position = 'relative';
            }

            // 5. Insere o botão no final do container
            container.appendChild(btn);
        }
    });
}

// Chamada da função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    inicializarBotoesEdicao();
});