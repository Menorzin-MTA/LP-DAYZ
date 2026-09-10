// ============================================
// LÓGICA DE LOGIN E CARRINHO - LAST POINT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do Login
    const botoesLogin = document.querySelectorAll('.botao-login');
    const authOverlay = document.getElementById('authModalOverlay');
    const fecharAuthBtn = document.getElementById('fecharAuthModal');
    const formLogin = document.getElementById('formLogin');
    const msgErro = document.getElementById('mensagemErro');

    // Referências aos elementos do Carrinho
    const abrirCarrinhoBtn = document.getElementById('abrirCarrinho');
    const fecharCarrinhoBtn = document.getElementById('fecharCarrinho');
    const carrinhoOverlay = document.getElementById('carrinhoOverlay');
    const carrinhoDrawer = document.getElementById('carrinhoDrawer');
    const carrinhoItensContainer = document.getElementById('carrinhoItens');
    const carrinhoQtdEl = document.getElementById('carrinhoQtd');
    const carrinhoTotalEl = document.getElementById('carrinhoTotal');

    let carrinho = JSON.parse(localStorage.getItem('lastpoint_carrinho')) || [];

    // --------------------------------------------
    // CONTROLE DE MODAIS E DRAWERS
    // --------------------------------------------
    botoesLogin.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            authOverlay?.classList.add('ativo');
        });
    });

    fecharAuthBtn?.addEventListener('click', () => {
        authOverlay?.classList.remove('ativo');
    });

    authOverlay?.addEventListener('click', (e) => {
        if (e.target === authOverlay) authOverlay.classList.remove('ativo');
    });

    function toggleCarrinho(abrir) {
        if (abrir) {
            carrinhoOverlay?.classList.add('ativo');
            carrinhoDrawer?.classList.add('ativo');
        } else {
            carrinhoOverlay?.classList.remove('ativo');
            carrinhoDrawer?.classList.remove('ativo');
        }
    }

    abrirCarrinhoBtn?.addEventListener('click', () => toggleCarrinho(true));
    fecharCarrinhoBtn?.addEventListener('click', () => toggleCarrinho(false));
    carrinhoOverlay?.addEventListener('click', () => toggleCarrinho(false));

    // --------------------------------------------
    // CORREÇÃO E LÓGICA DE LOGIN
    // --------------------------------------------
    formLogin?.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = document.getElementById('inputUsuario').value.trim();
        const senha = document.getElementById('inputSenha').value.trim();

        if (!usuario || !senha) {
            exibirErro('Preencha todos os campos!');
            return;
        }

        // Validação Simulada (Altere conforme a integração backend/PHP desejada)
        if (usuario.length >= 3 && senha.length >= 4) {
            localStorage.setItem('lastpoint_user', JSON.stringify({ usuario }));
            authOverlay.classList.remove('ativo');
            atualizarInterfaceUsuario(usuario);
            formLogin.reset();
            if (msgErro) msgErro.style.display = 'none';
        } else {
            exibirErro('Usuário ou senha incorretos.');
        }
    });

    function exibirErro(mensagem) {
        if (msgErro) {
            msgErro.textContent = mensagem;
            msgErro.style.display = 'block';
        }
    }

    function atualizarInterfaceUsuario(usuario) {
        botoesLogin.forEach(btn => {
            btn.innerHTML = `<i class="fa-solid fa-user-check"></i> <span>${usuario}</span>`;
            btn.classList.add('logado');
        });
    }

    // Checa login existente
    const usuarioSalvo = JSON.parse(localStorage.getItem('lastpoint_user'));
    if (usuarioSalvo?.usuario) {
        atualizarInterfaceUsuario(usuarioSalvo.usuario);
    }

    // --------------------------------------------
    // GERENCIAMENTO DO CARRINHO
    // --------------------------------------------
    function atualizarCarrinhoUI() {
        if (!carrinhoItensContainer) return;

        carrinhoItensContainer.innerHTML = '';
        let total = 0;
        let quantidadeTotal = 0;

        if (carrinho.length === 0) {
            carrinhoItensContainer.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach((item, index) => {
                total += item.preco * item.qtd;
                quantidadeTotal += item.qtd;

                const itemEl = document.createElement('div');
                itemEl.className = 'item-carrinho';
                itemEl.innerHTML = `
                    <div class="item-carrinho-info">
                        <h4>${item.nome}</h4>
                        <span>R$ ${item.preco.toFixed(2).replace('.', ',')} (x${item.qtd})</span>
                    </div>
                    <button class="remover-item" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                `;
                carrinhoItensContainer.appendChild(itemEl);
            });
        }

        if (carrinhoQtdEl) carrinhoQtdEl.textContent = quantidadeTotal;
        if (carrinhoTotalEl) carrinhoTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        localStorage.setItem('lastpoint_carrinho', JSON.stringify(carrinho));
    }

    // Adicionar item ao carrinho a partir dos botões de compra
    document.querySelectorAll('.card-produto').forEach(card => {
        const btnComprar = card.querySelector('.botao-comprar');
        if (btnComprar) {
            btnComprar.addEventListener('click', () => {
                const nome = card.querySelector('h2')?.textContent.trim() || 'Produto';
                const precoTexto = card.querySelector('.preco-produto')?.textContent.replace('R$', '').replace(',', '.').trim();
                const preco = parseFloat(precoTexto) || 0;

                const itemExistente = carrinho.find(i => i.nome === nome);
                if (itemExistente) {
                    itemExistente.qtd += 1;
                } else {
                    carrinho.push({ nome, preco, qtd: 1 });
                }

                atualizarCarrinhoUI();
                toggleCarrinho(true);
            });
        }
    });

    // Remover item do carrinho
    carrinhoItensContainer?.addEventListener('click', (e) => {
        const btnRemover = e.target.closest('.remover-item');
        if (btnRemover) {
            const index = parseInt(btnRemover.getAttribute('data-index'));
            carrinho.splice(index, 1);
            atualizarCarrinhoUI();
        }
    });

    // Inicialização do Carrinho
    atualizarCarrinhoUI();
});