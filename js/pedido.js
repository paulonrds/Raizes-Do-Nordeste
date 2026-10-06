// ================================
// RECUPERAR PEDIDO
// ================================

const pedido =
    JSON.parse(
        localStorage.getItem("pedidoAtual")
    );


// ================================
// ELEMENTOS
// ================================

const numeroPedido =
    document.getElementById(
        "numero-pedido"
    );

const statusAtual =
    document.getElementById(
        "status-atual"
    );

const unidadePedido =
    document.getElementById(
        "unidade-pedido"
    );

const pagamentoPedido =
    document.getElementById(
        "pagamento-pedido"
    );

const quantidadePedido =
    document.getElementById(
        "quantidade-pedido"
    );

const totalPedido =
    document.getElementById(
        "total-pedido"
    );

const listaItensPedido =
    document.getElementById(
        "lista-itens-pedido"
    );

const avancarStatus =
    document.getElementById(
        "avancar-status"
    );


const etapaRecebido =
    document.getElementById(
        "etapa-recebido"
    );

const etapaPreparacao =
    document.getElementById(
        "etapa-preparacao"
    );

const etapaPronto =
    document.getElementById(
        "etapa-pronto"
    );


// ================================
// UNIDADES
// ================================

const unidades = {

    "boa-viagem":
        "Recife — Boa Viagem",

    "olinda":
        "Olinda — Centro",

    "salvador":
        "Salvador — Barra"

};


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
// CARREGAR PEDIDO
// ================================

function carregarPedido() {

    if (!pedido) {

        document.querySelector(
            ".pagina-pedido"
        ).innerHTML = `
            <section class="pedido-topo">

                <h1>
                    Pedido não encontrado
                </h1>

                <p>
                    Não encontramos um pedido
                    ativo para acompanhar.
                </p>

                <br>

                <a
                    href="../index.html"
                    class="voltar-inicio"
                >
                    Voltar ao cardápio
                </a>

            </section>
        `;

        return;

    }


    numeroPedido.textContent =
        "#" + pedido.numero;


    unidadePedido.textContent =
        unidades[pedido.unidade] ||
        "Unidade não identificada";


    pagamentoPedido.textContent =
        pedido.pagamento === "pix"
            ? "PIX"
            : "Cartão";


    quantidadePedido.textContent =
        pedido.quantidade;


    totalPedido.textContent =
        formatarPreco(
            pedido.total
        );


    mostrarItens();


    atualizarStatusVisual();

}


// ================================
// ITENS
// ================================

function mostrarItens() {

    listaItensPedido.innerHTML = "";


    pedido.itens.forEach(item => {

        const elemento =
            document.createElement("div");


        elemento.classList.add(
            "item-pedido"
        );


        elemento.innerHTML = `
            <div class="item-pedido-info">

                <span class="item-pedido-emoji">
                    ${item.emoji}
                </span>

                <span>
                    ${item.quantidade} ×
                    ${item.nome}
                </span>

            </div>

            <strong>
                ${formatarPreco(
                    item.preco *
                    item.quantidade
                )}
            </strong>
        `;


        listaItensPedido.appendChild(
            elemento
        );

    });

}


// ================================
// STATUS
// ================================

function atualizarStatusVisual() {

    etapaRecebido.className =
        "etapa ativa";

    etapaPreparacao.className =
        "etapa";

    etapaPronto.className =
        "etapa";


    if (
        pedido.status ===
        "Pedido recebido"
    ) {

        statusAtual.textContent =
            "Pedido recebido";


        avancarStatus.textContent =
            "Iniciar preparação";

    }


    if (
        pedido.status ===
        "Em preparação"
    ) {

        etapaRecebido.className =
            "etapa ativa concluida";

        etapaPreparacao.className =
            "etapa ativa";


        statusAtual.textContent =
            "Em preparação";


        avancarStatus.textContent =
            "Marcar como pronto";

    }


    if (
        pedido.status ===
        "Pronto para retirada"
    ) {

        etapaRecebido.className =
            "etapa ativa concluida";

        etapaPreparacao.className =
            "etapa ativa concluida";

        etapaPronto.className =
            "etapa ativa";


        statusAtual.textContent =
            "Pronto para retirada";


        avancarStatus.textContent =
            "Pedido pronto";


        avancarStatus.disabled =
            true;

    }

}


// ================================
// AVANÇAR STATUS
// ================================

function mudarStatus() {

    if (
        pedido.status ===
        "Pedido recebido"
    ) {

        pedido.status =
            "Em preparação";

    }

    else if (
        pedido.status ===
        "Em preparação"
    ) {

        pedido.status =
            "Pronto para retirada";

    }


    localStorage.setItem(
        "pedidoAtual",
        JSON.stringify(pedido)
    );


    atualizarStatusVisual();

}


// ================================
// EVENTO
// ================================

if (pedido) {

    avancarStatus.addEventListener(
        "click",
        mudarStatus
    );

}


// ================================
// INICIAR
// ================================

carregarPedido();