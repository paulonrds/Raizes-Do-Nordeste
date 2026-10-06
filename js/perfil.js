// ================================
// RECUPERAR CLIENTE
// ================================

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


// ================================
// PROTEGER PÁGINA
// ================================

if (!clienteLogado || !cliente) {

    window.location.href =
        "login.html";

}


// ================================
// ELEMENTOS
// ================================

const saudacaoCliente =
    document.getElementById(
        "saudacao-cliente"
    );

const perfilNome =
    document.getElementById(
        "perfil-nome"
    );

const perfilEmail =
    document.getElementById(
        "perfil-email"
    );

const perfilPontos =
    document.getElementById(
        "perfil-pontos"
    );

const preferenciaMarketing =
    document.getElementById(
        "preferencia-marketing"
    );

const mensagemPrivacidade =
    document.getElementById(
        "mensagem-privacidade"
    );

const botaoSair =
    document.getElementById(
        "sair-conta"
    );

const botaoRecompensas =
    document.getElementById(
        "ver-recompensas"
    );


// ================================
// CARREGAR PERFIL
// ================================

function carregarPerfil() {

    if (!cliente) {
        return;
    }


    const primeiroNome =
        cliente.nome
            .split(" ")[0];


    saudacaoCliente.textContent =
        "Olá, " + primeiroNome + "!";


    perfilNome.textContent =
        cliente.nome;


    perfilEmail.textContent =
        cliente.email;


    perfilPontos.textContent =
        (cliente.pontos || 0) +
        " pontos";


    preferenciaMarketing.checked =
        Boolean(cliente.marketing);

}


// ================================
// PRIVACIDADE / MARKETING
// ================================

preferenciaMarketing.addEventListener(
    "change",
    () => {

        cliente.marketing =
            preferenciaMarketing.checked;


        localStorage.setItem(
            "clienteRaizes",
            JSON.stringify(cliente)
        );


        mensagemPrivacidade.textContent =
            cliente.marketing
                ? "Comunicações promocionais ativadas."
                : "Comunicações promocionais desativadas.";


        mensagemPrivacidade.className =
            "mensagem sucesso";


        setTimeout(
            () => {

                mensagemPrivacidade.className =
                    "mensagem";

            },
            2500
        );

    }
);


// ================================
// RECOMPENSAS
// ================================

botaoRecompensas.addEventListener(
    "click",
    () => {

        window.location.href =
            "fidelidade.html";

    }
);


// ================================
// SAIR
// ================================

botaoSair.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "clienteLogado"
        );


        window.location.href =
            "../index.html";

    }
);


// ================================
// INICIAR
// ================================

carregarPerfil();