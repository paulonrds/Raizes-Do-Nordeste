// ================================
// ELEMENTOS DA PÁGINA
// ================================

const listaProdutos =
    document.getElementById("lista-produtos");

const buscaProduto =
    document.getElementById("busca-produto");

const botoesCategoria =
    document.querySelectorAll(".categoria");

const quantidadeCarrinho =
    document.getElementById("quantidade-carrinho");

const seletorUnidade =
    document.getElementById("seletor-unidade");

const listaPromocoes =
    document.getElementById("lista-promocoes");
        

// Elementos do carrinho

const botaoAbrirCarrinho =
    document.getElementById("abrir-carrinho");

const botaoFecharCarrinho =
    document.getElementById("fechar-carrinho");

const painelCarrinho =
    document.getElementById("painel-carrinho");

const overlayCarrinho =
    document.getElementById("carrinho-overlay");

const itensCarrinho =
    document.getElementById("itens-carrinho");

const subtotalCarrinho =
    document.getElementById("subtotal-carrinho");

const botaoFinalizar =
    document.getElementById("finalizar-pedido");


// ================================
// ESTADO DA APLICAÇÃO
// ================================

let carrinho =
    JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];


let categoriaAtual = "Todos";

let unidadeAtual =
    seletorUnidade.value;


// ================================
// PREÇO
// ================================

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ================================
// PRODUTOS
// ================================

function mostrarProdutos(lista) {

    listaProdutos.innerHTML = "";


    if (lista.length === 0) {

        listaProdutos.innerHTML = `
            <p>
                Nenhum produto disponível
                nesta unidade.
            </p>
        `;

        return;
    }


    lista.forEach(produto => {

        const card =
            document.createElement("article");


        card.classList.add("produto");


        card.innerHTML = `
            <div class="produto-imagem">
                ${produto.emoji}
            </div>

            <div class="produto-conteudo">

                <span class="produto-categoria">
                    ${produto.categoria}
                </span>

                <h3>
                    ${produto.nome}
                </h3>

                <p class="produto-descricao">
                    ${produto.descricao}
                </p>

                <div class="produto-rodape">

                    <span class="produto-preco">
                        ${formatarPreco(produto.preco)}
                    </span>

                    <button
                        class="adicionar"
                        data-id="${produto.id}"
                        type="button"
                    >
                        Adicionar
                    </button>

                </div>

            </div>
        `;


        listaProdutos.appendChild(card);

    });


    configurarBotoesAdicionar();

}


// ================================
// FILTRAR PRODUTOS
// ================================

function filtrarProdutos() {

    const texto =
        buscaProduto.value
            .toLowerCase()
            .trim();


    const resultado =
        produtos.filter(produto => {

            const correspondeTexto =
                produto.nome
                    .toLowerCase()
                    .includes(texto);


            const correspondeCategoria =
                categoriaAtual === "Todos" ||
                produto.categoria === categoriaAtual;


            const disponivelNaUnidade =
                produto.disponivelEm.includes(
                    unidadeAtual
                );


            return (
                correspondeTexto &&
                correspondeCategoria &&
                disponivelNaUnidade
            );

        });


    mostrarProdutos(resultado);

}


// ================================
// SEPARAÇÃO DO ID, SE É COMPRA CONVENCIONAL OU ITEM PROMOCIONAL
// ================================

function obterIdCarrinho(valor) {

    if (
        valor.startsWith("promo-")
    ) {
        return valor;
    }

    return Number(valor);

}


// ================================
// ADICIONAR PRODUTO
// ================================

function configurarBotoesAdicionar() {

    const botoes =
        document.querySelectorAll(".adicionar");


    botoes.forEach(botao => {

        botao.addEventListener(
            "click",
            () => {

                const id =
                    Number(botao.dataset.id);


                adicionarAoCarrinho(id);

            }
        );

    });

}


function adicionarAoCarrinho(id) {

    localStorage.removeItem(
    "pagamentoConcluido"
    );
    
    const produto =
        produtos.find(
            produto => produto.id === id
        );


    if (!produto) {
        return;
    }


    const itemExistente =
        carrinho.find(
            item => item.id === id
        );


    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({
            ...produto,
            quantidade: 1
        });

    }


    salvarCarrinho();

    atualizarCarrinho();

}


// ================================
// ADICIONAR PROMOÇÃO
// ================================

function adicionarPromocaoAoCarrinho(id) {

    localStorage.removeItem(
        "pagamentoConcluido"
    );


    const promocao =
        promocoes.find(
            promocao =>
                promocao.id === id
        );


    if (!promocao) {
        return;
    }


    const idCarrinho =
        "promo-" + promocao.id;


    const itemExistente =
        carrinho.find(
            item =>
                item.id === idCarrinho
        );


    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({

            id: idCarrinho,

            nome: promocao.nome,

            descricao:
                promocao.descricao,

            preco:
                promocao.precoPromocional,

            emoji:
                promocao.emoji,

            categoria:
                "Promoção",

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}


// ================================
// SALVAR
// ================================

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}


// ================================
// QUANTIDADE
// ================================

function aumentarQuantidade(id) {

    const item =
        carrinho.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    item.quantidade++;


    salvarCarrinho();

    atualizarCarrinho();

}


function diminuirQuantidade(id) {

    const item =
        carrinho.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    item.quantidade--;


    if (item.quantidade <= 0) {

        removerItem(id);

        return;
    }


    salvarCarrinho();

    atualizarCarrinho();

}


// ================================
// REMOVER
// ================================

function removerItem(id) {

    carrinho =
        carrinho.filter(
            item => item.id !== id
        );


    salvarCarrinho();

    atualizarCarrinho();

}


// ================================
// MOSTRAR CARRINHO
// ================================

function atualizarCarrinho() {

    const quantidadeTotal =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    quantidadeCarrinho.textContent =
        quantidadeTotal;


    itensCarrinho.innerHTML = "";


    if (carrinho.length === 0) {

        itensCarrinho.innerHTML = `
            <div class="carrinho-vazio">

                <span>🛒</span>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Adicione produtos do cardápio
                    para começar seu pedido.
                </p>

            </div>
        `;


        subtotalCarrinho.textContent =
            formatarPreco(0);


        botaoFinalizar.disabled = true;

        return;

    }


    botaoFinalizar.disabled = false;


    carrinho.forEach(item => {

        const elemento =
            document.createElement("div");


        elemento.classList.add(
            "item-carrinho"
        );


        elemento.innerHTML = `
            <div class="item-carrinho-imagem">
                ${item.emoji}
            </div>

            <div class="item-carrinho-info">

                <h3>
                    ${item.nome}
                </h3>

                <span class="item-preco">
                    ${formatarPreco(item.preco)}
                </span>

                <div class="item-acoes">

                    <div class="controle-quantidade">

                        <button
                            type="button"
                            class="diminuir"
                            data-id="${item.id}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantidade}
                        </span>

                        <button
                            type="button"
                            class="aumentar"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                    </div>

                    <button
                        type="button"
                        class="remover-item"
                        data-id="${item.id}"
                    >
                        Remover
                    </button>

                </div>

            </div>
        `;


        itensCarrinho.appendChild(
            elemento
        );

    });


    const subtotal =
        carrinho.reduce(
            (total, item) =>
                total +
                (
                    item.preco *
                    item.quantidade
                ),
            0
        );


    subtotalCarrinho.textContent =
        formatarPreco(subtotal);


    configurarBotoesCarrinho();

}


// ================================
// BOTÕES INTERNOS DO CARRINHO
// ================================

function obterIdCarrinho(valor) {

    if (
        valor.startsWith("promo-")
    ) {
        return valor;
    }

    return Number(valor);

}

function configurarBotoesCarrinho() {

    document
        .querySelectorAll(".aumentar")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    aumentarQuantidade(
                        obterIdCarrinho(
                            botao.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(".diminuir")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    diminuirQuantidade(
                        obterIdCarrinho(
                            botao.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(".remover-item")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    removerItem(
                        obterIdCarrinho(
                            botao.dataset.id
                        )
                    );

                }
            );

        });

}


// ================================
// ABRIR / FECHAR
// ================================

function abrirCarrinho() {

    painelCarrinho.classList.add(
        "aberto"
    );


    overlayCarrinho.classList.add(
        "ativo"
    );


    document.body.style.overflow =
        "hidden";

}


function fecharCarrinho() {

    painelCarrinho.classList.remove(
        "aberto"
    );


    overlayCarrinho.classList.remove(
        "ativo"
    );


    document.body.style.overflow = "";

}


botaoAbrirCarrinho.addEventListener(
    "click",
    abrirCarrinho
);


botaoFecharCarrinho.addEventListener(
    "click",
    fecharCarrinho
);


overlayCarrinho.addEventListener(
    "click",
    fecharCarrinho
);


// ================================
// BUSCA
// ================================

buscaProduto.addEventListener(
    "input",
    filtrarProdutos
);


// ================================
// CATEGORIAS
// ================================

botoesCategoria.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            botoesCategoria.forEach(
                item => {
                    item.classList.remove(
                        "ativa"
                    );
                }
            );


            botao.classList.add(
                "ativa"
            );


            categoriaAtual =
                botao.dataset.categoria;


            filtrarProdutos();

        }
    );

});


// ================================
// UNIDADE
// ================================

seletorUnidade.addEventListener(
    "change",
    () => {

        unidadeAtual =
            seletorUnidade.value;

        localStorage.setItem(
        "unidadeSelecionada",
        unidadeAtual
        
        );
        
        categoriaAtual =
            "Todos";


        botoesCategoria.forEach(
            botao => {

                botao.classList.remove(
                    "ativa"
                );

            }
        );


        document
            .querySelector(
                '[data-categoria="Todos"]'
            )
            .classList.add(
                "ativa"
            );


        buscaProduto.value = "";


        filtrarProdutos();

        renderizarPromocoes();

    }
);

// FINALIZAR PEDIDO
// ================================

botaoFinalizar.addEventListener(
    "click",
    () => {

        if (carrinho.length === 0) {
            return;
        }

        localStorage.setItem(
            "unidadeSelecionada",
            unidadeAtual
        );

        window.location.href =
            "pages/checkout.html";

    }

);
    
// ================================
// CLIENTE LOGADO
// ================================

    function verificarClienteLogado() {

    const linkConta =
        document.getElementById(
            "link-conta"
        );


    if (!linkConta) {
        return;
    }


    const clienteLogado =
        JSON.parse(
            localStorage.getItem(
                "clienteLogado"
            )
        );


    if (!clienteLogado) {

        linkConta.textContent =
            "Entrar";

        linkConta.href =
            "pages/login.html";

        return;

    }


    const primeiroNome =
        clienteLogado.nome
            .split(" ")[0];


    linkConta.textContent =
        "Olá, " + primeiroNome;


    linkConta.href =
        "pages/perfil.html";

    }

function renderizarPromocoes() {

    listaPromocoes.innerHTML = "";


    const promocoesDaUnidade =
        promocoes.filter(
            promocao =>
                promocao.disponivelEm.includes(
                    unidadeAtual
                )
        );


    promocoesDaUnidade.forEach(
        promocao => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "promocao-card";


            card.innerHTML = `
                <div class="promocao-icone">
                    ${promocao.emoji}
                </div>

                <h3>
                    ${promocao.nome}
                </h3>

                <p>
                    ${promocao.descricao}
                </p>

                <div class="promocao-precos">

                    <span class="preco-antigo">
                        ${formatarPreco(
                            promocao.precoAntigo
                        )}
                    </span>

                    <span class="preco-promocional">
                        ${formatarPreco(
                            promocao.precoPromocional
                        )}
                    </span>

                </div>

                <button
                    class="botao-promocao"
                    data-promocao="${promocao.id}"
                >
                    Adicionar ao carrinho
                </button>

            `;


            listaPromocoes.appendChild(
                card
            );

        }
    );

    configurarBotoesPromocao();

function configurarBotoesPromocao() {

    const botoesPromocao =
        document.querySelectorAll(
            ".botao-promocao"
        );


    botoesPromocao.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            botao.dataset.promocao
                        );


                    adicionarPromocaoAoCarrinho(
                        id
                    );

                }
            );

        }
    );

}    

}

// ================================
// INICIALIZAÇÃO
// ================================

filtrarProdutos();

atualizarCarrinho();

verificarClienteLogado();

renderizarPromocoes();


// ================================
// MENU MOBILE
// ================================

const botaoMenuMobile =
    document.getElementById("botao-menu-mobile");

const menuPrincipal =
    document.getElementById("menu-principal");


if (botaoMenuMobile && menuPrincipal) {

    botaoMenuMobile.addEventListener(
        "click",
        () => {

            menuPrincipal.classList.toggle("aberto");

            const menuAberto =
                menuPrincipal.classList.contains("aberto");

            botaoMenuMobile.setAttribute(
                "aria-expanded",
                menuAberto
            );

            botaoMenuMobile.textContent =
                menuAberto ? "✕" : "☰";
        }
    );


    menuPrincipal
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menuPrincipal.classList.remove("aberto");

                    botaoMenuMobile.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    botaoMenuMobile.textContent = "☰";
                }
            );

        });

}