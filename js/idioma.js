// ============================================
// SISTEMA DE IDIOMA - LAST POINT
// ============================================

let idiomaAtual = 'pt';

console.log('🔧 Sistema de idioma iniciado');

// ============================================
// FUNÇÃO PARA TROCAR IDIOMA
// ============================================

function trocarIdioma(idioma) {
    console.log('🔄 Trocando idioma para:', idioma);
    
    if (!traducoes.idiomas[idioma]) {
        console.error('❌ Idioma inválido:', idioma);
        return;
    }

    idiomaAtual = idioma;
    localStorage.setItem('lastpoint-idioma', idioma);
    console.log('💾 Idioma salvo no localStorage:', idioma);

    // Atualiza o texto do botão
    const botaoIdioma = document.querySelector('.botao-idioma');
    if (botaoIdioma) {
        const flag = idioma === 'pt' ? '🇧🇷' : '🇺🇸';
        const nome = traducoes.idiomas[idioma];
        botaoIdioma.innerHTML = `<i class="fa-solid fa-globe"></i><span>${flag} ${nome}</span>`;
        console.log('🔘 Botão de idioma atualizado:', flag, nome);
    } else {
        console.warn('⚠️ Botão de idioma não encontrado');
    }

    // Aplica as traduções
    aplicarTraducoes();

    // Fecha o dropdown
    const dropdown = document.querySelector('.dropdown-idiomas');
    if (dropdown) {
        dropdown.classList.remove('aberto');
    }
}

// ============================================
// FUNÇÃO PARA APLICAR TRADUÇÕES
// ============================================

function aplicarTraducoes() {
    console.log('📝 Aplicando traduções - Idioma:', idiomaAtual);
    
    const pagina = obterPaginaAtual();
    console.log('📄 Página atual:', pagina);
    
    const traducao = obterTraducaoPagina(pagina);
    
    if (!traducao) {
        console.warn('⚠️ Nenhuma tradução encontrada para a página:', pagina);
        return;
    }

    console.log('📖 Tradução carregada:', Object.keys(traducao));

    // Aplica traduções baseadas em data-trad
    const elementosTrad = document.querySelectorAll('[data-trad]');
    console.log('🔍 Elementos com data-trad encontrados:', elementosTrad.length);
    
    elementosTrad.forEach(elemento => {
        // CORREÇÃO AQUI: NÃO ADICIONAR O PREFIXO DA PÁGINA
        const chave = elemento.getAttribute('data-trad');
        const valor = obterValorPorChave(traducao, chave);
        
        if (valor !== undefined) {
            if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
                elemento.placeholder = valor;
            } else {
                elemento.textContent = valor;
            }
            console.log('  ✅ Traduzido:', chave, '->', valor);
        } else {
            console.warn('  ⚠️ Chave não encontrada:', chave);
        }
    });

    // Tradução da navbar
    const navbarTraducao = traducoes.navbar[idiomaAtual];
    if (navbarTraducao) {
        const elementosNav = document.querySelectorAll('[data-trad-nav]');
        console.log('🔍 Elementos da navbar encontrados:', elementosNav.length);
        
        elementosNav.forEach(elemento => {
            const chave = elemento.getAttribute('data-trad-nav');
            if (navbarTraducao[chave]) {
                elemento.textContent = navbarTraducao[chave];
                console.log('  ✅ Navbar traduzida:', chave, '->', navbarTraducao[chave]);
            }
        });
    }
}

// ============================================
// FUNÇÃO PARA OBTER PÁGINA ATUAL
// ============================================

function obterPaginaAtual() {
    const path = window.location.pathname;
    const pagina = path.split('/').pop().split('.')[0] || 'index';
    return pagina;
}

// ============================================
// FUNÇÃO PARA OBTER TRADUÇÃO DA PÁGINA
// ============================================

function obterTraducaoPagina(pagina) {
    const traducoesPagina = {
        'index': traducoes.index,
        'loja': traducoes.loja,
        'regras': traducoes.regras,
        'ajuda': traducoes.ajuda
    };

    const paginaTraducao = traducoesPagina[pagina];
    if (paginaTraducao) {
        return paginaTraducao[idiomaAtual];
    }
    return null;
}

// ============================================
// FUNÇÃO PARA OBTER VALOR POR CHAVE ANINHADA
// ============================================

function obterValorPorChave(objeto, chave) {
    const partes = chave.split('.');
    let valor = objeto;

    for (const parte of partes) {
        if (valor && valor[parte] !== undefined) {
            valor = valor[parte];
        } else {
            return undefined;
        }
    }

    return valor;
}

// ============================================
// FUNÇÃO PARA ABRIR/FECHAR DÚVIDAS (PÁGINA DE AJUDA)
// ============================================

function toggleDuvida(elemento) {
    const item = elemento.closest('.item-duvida');
    if (item) {
        item.classList.toggle('aberto');
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema de idioma...');
    
    // Carrega idioma salvo
    const idiomaSalvo = localStorage.getItem('lastpoint-idioma');
    if (idiomaSalvo && traducoes.idiomas[idiomaSalvo]) {
        idiomaAtual = idiomaSalvo;
        console.log('📂 Idioma carregado do localStorage:', idiomaAtual);
    } else {
        console.log('📂 Nenhum idioma salvo, usando padrão: pt');
    }

    // Aplica traduções
    aplicarTraducoes();

    // Atualiza o botão de idioma
    const botaoIdioma = document.querySelector('.botao-idioma');
    if (botaoIdioma) {
        const flag = idiomaAtual === 'pt' ? '🇧🇷' : '🇺🇸';
        const nome = traducoes.idiomas[idiomaAtual];
        botaoIdioma.innerHTML = `<i class="fa-solid fa-globe"></i><span>${flag} ${nome}</span>`;
        console.log('🔘 Botão de idioma configurado');
    }

    // Configura o dropdown
    const botaoIdiomaContainer = document.querySelector('.container-idioma');
    if (botaoIdiomaContainer) {
        const botao = botaoIdiomaContainer.querySelector('.botao-idioma');
        const dropdown = botaoIdiomaContainer.querySelector('.dropdown-idiomas');

        if (botao && dropdown) {
            botao.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.classList.toggle('aberto');
                console.log('📂 Dropdown toggled');
            });

            document.addEventListener('click', function(e) {
                if (!botaoIdiomaContainer.contains(e.target)) {
                    dropdown.classList.remove('aberto');
                }
            });

            dropdown.querySelectorAll('.opcao-idioma').forEach(opcao => {
                opcao.addEventListener('click', function() {
                    const idioma = this.getAttribute('data-idioma');
                    console.log('🖱️ Opção selecionada:', idioma);
                    trocarIdioma(idioma);
                    
                    // Atualiza o destaque das opções
                    dropdown.querySelectorAll('.opcao-idioma').forEach(opt => {
                        opt.classList.remove('ativo');
                    });
                    this.classList.add('ativo');
                });
            });
        }
    }
    
    console.log('✅ Sistema de idioma inicializado com sucesso!');
});