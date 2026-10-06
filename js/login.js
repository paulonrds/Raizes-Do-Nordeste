// ================================
// ELEMENTOS
// ================================

const abaLogin =
    document.getElementById(
        "aba-login"
    );

const abaCadastro =
    document.getElementById(
        "aba-cadastro"
    );

const formLogin =
    document.getElementById(
        "form-login"
    );

const formCadastro =
    document.getElementById(
        "form-cadastro"
    );

const mensagemLogin =
    document.getElementById(
        "mensagem-login"
    );

const mensagemCadastro =
    document.getElementById(
        "mensagem-cadastro"
    );


// ================================
// ABAS
// ================================

function mostrarLogin() {

    abaLogin.classList.add("ativa");

    abaCadastro.classList.remove(
        "ativa"
    );

    formLogin.classList.remove(
        "escondido"
    );

    formCadastro.classList.add(
        "escondido"
    );

}


function mostrarCadastro() {

    abaCadastro.classList.add(
        "ativa"
    );

    abaLogin.classList.remove(
        "ativa"
    );

    formCadastro.classList.remove(
        "escondido"
    );

    formLogin.classList.add(
        "escondido"
    );

}


abaLogin.addEventListener(
    "click",
    mostrarLogin
);


abaCadastro.addEventListener(
    "click",
    mostrarCadastro
);


// ================================
// CADASTRO
// ================================

formCadastro.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();


        const nome =
            document.getElementById(
                "cadastro-nome"
            ).value.trim();


        const email =
            document.getElementById(
                "cadastro-email"
            ).value
                .trim()
                .toLowerCase();


        const senha =
            document.getElementById(
                "cadastro-senha"
            ).value;


        const aceiteLgpd =
            document.getElementById(
                "aceite-lgpd"
            ).checked;


        const aceiteMarketing =
            document.getElementById(
                "aceite-marketing"
            ).checked;


        if (!aceiteLgpd) {

            mostrarMensagem(
                mensagemCadastro,
                "É necessário aceitar o " +
                "tratamento de dados para " +
                "criar a conta.",
                "erro"
            );

            return;

        }


        const clienteExistente =
            JSON.parse(
                localStorage.getItem(
                    "clienteRaizes"
                )
            );


        if (
            clienteExistente &&
            clienteExistente.email === email
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "Já existe uma conta " +
                "cadastrada com este e-mail.",
                "erro"
            );

            return;

        }


        const cliente = {

            nome: nome,

            email: email,

            senha: senha,

            lgpd: true,

            marketing:
                aceiteMarketing,

            pontos: 0

        };


        localStorage.setItem(
            "clienteRaizes",
            JSON.stringify(cliente)
        );


        mostrarMensagem(
            mensagemCadastro,
            "Conta criada com sucesso! " +
            "Agora você pode entrar.",
            "sucesso"
        );


        formCadastro.reset();


        setTimeout(
            mostrarLogin,
            1200
        );

    }
);


// ================================
// LOGIN
// ================================

formLogin.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();


        const email =
            document.getElementById(
                "login-email"
            ).value
                .trim()
                .toLowerCase();


        const senha =
            document.getElementById(
                "login-senha"
            ).value;


        const cliente =
            JSON.parse(
                localStorage.getItem(
                    "clienteRaizes"
                )
            );


        if (!cliente) {

            mostrarMensagem(
                mensagemLogin,
                "Nenhuma conta cadastrada. " +
                "Crie sua conta primeiro.",
                "erro"
            );

            return;

        }


        if (
            cliente.email !== email ||
            cliente.senha !== senha
        ) {

            mostrarMensagem(
                mensagemLogin,
                "E-mail ou senha incorretos.",
                "erro"
            );

            return;

        }


        localStorage.setItem(
            "clienteLogado",
            JSON.stringify({
                nome: cliente.nome,
                email: cliente.email
            })
        );


        mostrarMensagem(
            mensagemLogin,
            "Login realizado com sucesso!",
            "sucesso"
        );


        setTimeout(
            () => {

                window.location.href =
                    "../index.html";

            },
            900
        );

    }
);


// ================================
// MENSAGENS
// ================================

function mostrarMensagem(
    elemento,
    texto,
    tipo
) {

    elemento.textContent =
        texto;

    elemento.className =
        "mensagem " + tipo;

}