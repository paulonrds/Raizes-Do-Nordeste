// ================================
// RECUPERAR DADOS
// ================================

const carrinho =
    JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];


const formaPagamento =
    localStorage.getItem(
        "formaPagamento"
    ) || "pix";


// ================================
// ELEMENTOS
// ================================

const formaPagamentoElemento =
    document.getElementById(
        "forma-pagamento"
    );

const quantidadePagamento =
    document.getElementById(
        "quantidade-pagamento"
    );

const valorPagamento =
    document.getElementById(
        "valor-pagamento"
    );

const processarPagamento =
    document.getElementById(
        "processar-pagamento"
    );

const statusPagamento =
    document.getElementById(
        "status-pagamento"
    );

const areaSimulacao =
    document.getElementById(
        "area-simulacao"
    );    


// ================================
// FORMATAR PREÇO
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
// CALCULAR PEDIDO
// ================================

function calcularPedido() {

    let quantidadeTotal = 0;
    let valorTotal = 0;


    carrinho.forEach(item => {

        quantidadeTotal +=
            item.quantidade;


        valorTotal +=
            item.preco *
            item.quantidade;

    });


    return {
        quantidadeTotal,
        valorTotal
    };

}

// ================================
// VERIFICAR PAGAMENTO CONCLUÍDO
// ================================

function verificarPagamentoConcluido() {

    const pagamentoConcluido =
        localStorage.getItem(
            "pagamentoConcluido"
        );


    const pedidoAtual =
        JSON.parse(
            localStorage.getItem(
                "pedidoAtual"
            )
        );


    if (
        pagamentoConcluido !== "true" ||
        !pedidoAtual
    ) {

        return false;

    }


    quantidadePagamento.textContent =
        pedidoAtual.quantidade;


    valorPagamento.textContent =
        formatarPreco(
            pedidoAtual.total
        );


    formaPagamentoElemento.textContent =
        pedidoAtual.pagamento === "pix"
            ? "PIX"
            : "Cartão";


    statusPagamento.className =
        "status-pagamento aprovado";


    statusPagamento.innerHTML = `
        <span class="status-icone">
            ✓
        </span>

        <strong>
            Pagamento já aprovado
        </strong>

        <p>
            Esta transação já foi concluída.
        </p>

        <p>
            Pedido:
            <strong>
                #${pedidoAtual.numero}
            </strong>
        </p>
    `;


    processarPagamento.textContent =
        "Acompanhar pedido";


    processarPagamento.disabled =
        false;


    processarPagamento.dataset.estado =
        "aprovado";

    areaSimulacao.style.display =
    "none";    

    return true;

}

// ================================
// CARREGAR PAGAMENTO
// ================================

function carregarPagamento() {

    if (
        verificarPagamentoConcluido()
    ) 
        return;
    }

    const pedido =
        calcularPedido();


    quantidadePagamento.textContent =
        pedido.quantidadeTotal;


    valorPagamento.textContent =
        formatarPreco(
            pedido.valorTotal
        );


    if (formaPagamento === "pix") {

        formaPagamentoElemento.textContent =
            "PIX";

    } else {

        formaPagamentoElemento.textContent =
            "Cartão";

    }


    if (carrinho.length === 0) {

        processarPagamento.disabled =
            true;

    }


// ================================
// STATUS: PROCESSANDO
// ================================

function mostrarProcessamento() {

    statusPagamento.className =
        "status-pagamento processando";


    statusPagamento.innerHTML = `
        <div class="carregando"></div>

        <strong>
            Processando pagamento...
        </strong>

        <p>
            Enviando a solicitação para
            o gateway externo.
        </p>
    `;

}

// ================================
// PROGRAMA DE FIDELIDADE
// ================================

function creditarPontos(
    numeroPedido,
    valorPedido
) {

    const clienteLogado =
        JSON.parse(
            localStorage.getItem(
                "clienteLogado"
            )
        );


    const cliente =
        JSON.parse(
            localStorage.getItem(
                "clienteRaizes"
            )
        );


    // Cliente precisa estar logado
    if (!clienteLogado || !cliente) {
        return;
    }


    // Confere se é a mesma conta
    if (
        clienteLogado.email !==
        cliente.email
    ) {
        return;
    }


    // Pedidos que já receberam pontos
    const pedidosPontuados =
        JSON.parse(
            localStorage.getItem(
                "pedidosPontuados"
            )
        ) || [];


    // Evita pontuação duplicada
    if (
        pedidosPontuados.includes(
            numeroPedido
        )
    ) {
        return;
    }


    // R$ 1 = 1 ponto
    const pontosGanhos =
        Math.floor(valorPedido);


    cliente.pontos =
        (cliente.pontos || 0) +
        pontosGanhos;


    localStorage.setItem(
        "clienteRaizes",
        JSON.stringify(cliente)
    );


    pedidosPontuados.push(
        numeroPedido
    );


    localStorage.setItem(
        "pedidosPontuados",
        JSON.stringify(
            pedidosPontuados
        )
    );


    // Guarda quanto este pedido gerou
    localStorage.setItem(
        "pontosUltimoPedido",
        pontosGanhos
    );

}

// ================================
// PAGAMENTO APROVADO
// ================================

function pagamentoAprovado() {

    const numeroPedido =
        gerarNumeroPedido();


    const pedido =
        calcularPedido();


    const dadosPedido = {

        numero: numeroPedido,

        itens: carrinho,

        quantidade:
            pedido.quantidadeTotal,

        total:
            pedido.valorTotal,

        pagamento:
            formaPagamento,

        unidade:
            localStorage.getItem(
                "unidadeSelecionada"
            ),

        status:
            "Pedido recebido"

    };


    localStorage.setItem(
        "pedidoAtual",
        JSON.stringify(dadosPedido)
    );

    creditarPontos(
    numeroPedido,
    pedido.valorTotal
    );

    // Marca a transação como concluída
    localStorage.setItem(
    "pagamentoConcluido",
    "true"
    );


    // Esvazia o carrinho somente após aprovação
    localStorage.removeItem(
    "carrinho"
    );


    statusPagamento.className =
        "status-pagamento aprovado";


    statusPagamento.innerHTML = `
        <span class="status-icone">
            ✓
        </span>

        <strong>
            Pagamento aprovado
        </strong>

        <p>
            Transação autorizada pelo
            serviço externo.
        </p>

        <p>
            Pedido:
            <strong>
                #${numeroPedido}
            </strong>
        </p>
    `;


    processarPagamento.textContent =
        "Acompanhar pedido";


    processarPagamento.disabled =
        false;


    processarPagamento.dataset.estado =
        "aprovado";

}


// ================================
// PAGAMENTO RECUSADO
// ================================

function pagamentoRecusado() {

    statusPagamento.className =
        "status-pagamento recusado";


    statusPagamento.innerHTML = `
        <span class="status-icone">
            ✕
        </span>

        <strong>
            Pagamento recusado
        </strong>

        <p>
            A transação não foi autorizada
            pelo serviço externo.
        </p>

        <p>
            Você pode tentar novamente ou
            escolher outra forma de pagamento.
        </p>
    `;


    processarPagamento.textContent =
        "Tentar novamente";


    processarPagamento.disabled =
        false;

}


// ================================
// FALHA DE COMUNICAÇÃO
// ================================

function falhaPagamento() {

    statusPagamento.className =
        "status-pagamento erro";


    statusPagamento.innerHTML = `
        <span class="status-icone">
            ⚠
        </span>

        <strong>
            Serviço temporariamente indisponível
        </strong>

        <p>
            Não foi possível comunicar com
            o gateway de pagamento.
        </p>

        <p>
            Nenhuma cobrança foi realizada.
            Tente novamente.
        </p>
    `;


    processarPagamento.textContent =
        "Tentar novamente";


    processarPagamento.disabled =
        false;

}


// ================================
// GERAR NÚMERO DO PEDIDO
// ================================

function gerarNumeroPedido() {

    return Math.floor(
        100000 +
        Math.random() * 900000
    );

}


// ================================
// SIMULAR GATEWAY
// ================================

function simularGateway() {

    const resultado =
        document.querySelector(
            'input[name="resultado-simulacao"]:checked'
        );


    if (!resultado) {
        return;
    }


    mostrarProcessamento();


    processarPagamento.disabled =
        true;


    processarPagamento.textContent =
        "Processando...";


    setTimeout(
        () => {

            if (
                resultado.value ===
                "aprovado"
            ) {

                pagamentoAprovado();

            }


            if (
                resultado.value ===
                "recusado"
            ) {

                pagamentoRecusado();

            }


            if (
                resultado.value ===
                "erro"
            ) {

                falhaPagamento();

            }

        },
        1800
    );

}


// ================================
// BOTÃO PRINCIPAL
// ================================

processarPagamento.addEventListener(
    "click",
    () => {

        if (
            processarPagamento.dataset.estado ===
            "aprovado"
        ) {

            window.location.href = 
                "pedido.html"

            return;

        }


        simularGateway();

    }
);


// ================================
// INICIAR
// ================================

carregarPagamento();