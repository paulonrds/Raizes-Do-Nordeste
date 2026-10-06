const cliente =
    JSON.parse(
        localStorage.getItem(
            "clienteRaizes"
        )
    );


const clienteLogado =
    JSON.parse(
        localStorage.getItem(
            "clienteLogado"
        )
    );


if (!cliente || !clienteLogado) {

    window.location.href =
        "login.html";

}


const saldoPontos =
    document.getElementById(
        "saldo-pontos"
    );

    
const mensagemResgate =
    document.getElementById(
        "mensagem-resgate"
    );    


if (cliente) {

    saldoPontos.textContent =
        (cliente.pontos || 0) +
        " pontos";

}

const botoesResgatar =
    document.querySelectorAll(
        ".botao-resgatar"
    );


function atualizarRecompensas() {

    botoesResgatar.forEach(
        botao => {

            const pontosNecessarios =
                Number(
                    botao.dataset.pontos
                );


            if (
                cliente.pontos >=
                pontosNecessarios
            ) {

                botao.disabled =
                    false;

            } else {

                botao.disabled =
                    true;

            }

        }
    );

}

atualizarRecompensas();


botoesResgatar.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                resgatarRecompensa(
                    botao
                );

            }
        );

    }
);

function resgatarRecompensa(
    botao
) {

    const pontosNecessarios =
        Number(
            botao.dataset.pontos
        );


    if (
        cliente.pontos <
        pontosNecessarios
    ) {
        return;
    }


    const card =
        botao.closest(
            ".recompensa-card"
        );


    const nomeRecompensa =
        card.querySelector("h3")
            .textContent.trim();


    cliente.pontos -=
        pontosNecessarios;


    localStorage.setItem(
        "clienteRaizes",
        JSON.stringify(cliente)
    );


    saldoPontos.textContent =
        cliente.pontos +
        " pontos";


    atualizarRecompensas();

    mensagemResgate.textContent =
    "✓ " +
    nomeRecompensa +
    " resgatado com sucesso! " +
    pontosNecessarios +
    " pontos foram utilizados.";


mensagemResgate.classList.add(
    "ativa"
);


setTimeout(
    () => {

        mensagemResgate.classList.remove(
            "ativa"
        );

    },
    4000
);

atualizarRecompensas();

botoesResgatar.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                resgatarRecompensa(
                    botao
                );

            }
        );

    }
);

}