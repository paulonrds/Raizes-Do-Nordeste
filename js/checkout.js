// ================================
// RECUPERAR DADOS
// ================================

const carrinho =
    JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];


const unidade =
    localStorage.getItem(
        "unidadeSelecionada"
    ) || "boa-viagem";


// ================================
// ELEMENTOS
// ================================

const checkoutItens =
    document.getElementById(
        "checkout-itens"
    );

const quantidadeCheckout =
    document.getElementById(
        "quantidade-checkout"
    );

const subtotalCheckout =
    document.getElementById(
        "subtotal-checkout"
    );

const totalCheckout =
    document.getElementById(
        "total-checkout"
    );

const nomeUnidade =
    document.getElementById(
        "nome-unidade"
    );

const confirmarPagamento =
    document.getElementById(
        "confirmar-pagamento"
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


nomeUnidade.textContent =
    unidades[unidade];


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
// MOSTRAR PEDIDO
// ================================

function mostrarPedido() {

    if (carrinho.length === 0) {

        checkoutItens.innerHTML = `
            <p>
                Seu carrinho está vazio.
            </p>
        `;

        confirmarPagamento.disabled =
            true;

        return;

    }


    let quantidadeTotal = 0;

    let valorTotal = 0;


    carrinho.forEach(item => {

        quantidadeTotal +=
            item.quantidade;


        valorTotal +=
            item.preco *
            item.quantidade;


        const elemento =
            document.createElement("div");


        elemento.classList.add(
            "item-checkout"
        );


        elemento.innerHTML = `
            <div class="item-checkout-info">

                <span class="item-checkout-emoji">
                    ${item.emoji}
                </span>

                <div>

                    <strong>
                        ${item.nome}
                    </strong>

                    <span>
                        Quantidade:
                        ${item.quantidade}
                    </span>

                </div>

            </div>

            <strong>
                ${formatarPreco(
                    item.preco *
                    item.quantidade
                )}
            </strong>
        `;


        checkoutItens.appendChild(
            elemento
        );

    });


    quantidadeCheckout.textContent =
        quantidadeTotal;


    subtotalCheckout.textContent =
        formatarPreco(valorTotal);


    totalCheckout.textContent =
        formatarPreco(valorTotal);

}


// ================================
// PAGAMENTO
// ================================

confirmarPagamento.addEventListener(
    "click",
    () => {

        const pagamento =
            document.querySelector(
                'input[name="pagamento"]:checked'
            );


        if (!pagamento) {
            return;
        }


        localStorage.setItem(
            "formaPagamento",
            pagamento.value
        );


        window.location.href =
            "pagamento.html";

    }
);


// ================================
// INICIAR
// ================================

mostrarPedido();