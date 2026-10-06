# 🌵 Rede Raízes do Nordeste

Projeto Front-end desenvolvido como atividade acadêmica, tendo como base o estudo de caso **“Rede Raízes do Nordeste — Tecnologia, Tradição e Escala”**.

A proposta consiste no desenvolvimento de uma solução digital para uma rede de lanchonetes especializada na culinária nordestina, proporcionando ao cliente uma experiência de compra simples, responsiva e integrada.

## 🌐 Aplicação publicada

O projeto está disponível publicamente através do GitHub Pages:

👉 https://paulonrds.github.io/Raizes-Do-Nordeste/

## 🎯 Objetivo

Desenvolver um protótipo Front-end responsivo capaz de representar a jornada digital do cliente, desde a seleção da unidade e consulta ao cardápio até a realização do pedido, pagamento, acompanhamento e utilização do programa de fidelidade.

O projeto também considera conceitos relacionados à experiência do usuário (UX), responsividade, Mobile-first, LGPD, integração com serviços externos e escalabilidade.

## 💻 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git
- GitHub
- GitHub Pages

O projeto utiliza dados simulados (mock), não possuindo integração com banco de dados ou Back-end nesta versão acadêmica.

## 📱 Principais funcionalidades

- Seleção da unidade;
- Cardápio dinâmico conforme a unidade;
- Busca e filtros de produtos;
- Promoções específicas por unidade;
- Carrinho de compras;
- Alteração de quantidade e remoção de produtos;
- Checkout do pedido;
- Seleção da forma de pagamento;
- Simulação de pagamento externo;
- Tratamento de pagamento aprovado, recusado ou com erro;
- Proteção contra processamento duplicado;
- Acompanhamento do status do pedido;
- Cadastro e autenticação simulados;
- Perfil do cliente;
- Programa de fidelidade;
- Acúmulo de pontos;
- Resgate de recompensas;
- Preferências de marketing;
- Consentimento relacionado à LGPD;
- Interface responsiva para dispositivos móveis e desktop.

## 🛒 Fluxo principal

O fluxo principal da aplicação é:

`Selecionar unidade → Visualizar cardápio → Adicionar produtos → Carrinho → Checkout → Pagamento → Confirmação → Acompanhamento do pedido`

Após um pagamento aprovado, o pedido é criado e pode assumir os seguintes estados:

`Pedido recebido → Em preparação → Pronto para retirada`

## ⭐ Programa de fidelidade

O protótipo possui um sistema de fidelidade no qual o cliente autenticado acumula pontos após compras aprovadas.

A regra utilizada no projeto é:

**R$ 1,00 gasto = 1 ponto**, considerando a parte inteira do valor da compra.

Os pontos podem posteriormente ser utilizados para o resgate de recompensas disponíveis na aplicação.

## 🔐 LGPD e privacidade

O projeto considera princípios relacionados à **Lei Geral de Proteção de Dados Pessoais (LGPD)**.

Durante o cadastro, o usuário deve fornecer consentimento para o tratamento dos dados necessários ao funcionamento da aplicação.

A autorização para recebimento de comunicações de marketing é apresentada separadamente e possui caráter opcional.

Por se tratar de um protótipo acadêmico Front-end, os dados são armazenados localmente no navegador através do `localStorage`.

Em um ambiente de produção, informações de autenticação, dados pessoais, pagamentos e demais informações sensíveis deverão ser processadas através de uma infraestrutura Back-end segura.

## 📐 Responsividade

A interface foi desenvolvida utilizando o conceito **Mobile-first**.

Foram consideradas diferentes dimensões de tela para garantir a adaptação dos componentes e a manutenção da navegação em dispositivos móveis e computadores.

Na versão mobile, a navegação principal utiliza um menu expansível.

## 🧪 Testes

Durante o desenvolvimento foram realizados testes envolvendo:

- Cardápio por unidade;
- Promoções;
- Carrinho;
- Cadastro e autenticação;
- Consentimento LGPD;
- Checkout;
- Pagamento aprovado;
- Pagamento recusado;
- Erro de processamento;
- Prevenção de pagamento duplicado;
- Fidelidade;
- Resgate de recompensas;
- Responsividade.

Os testes contemplaram cenários positivos e negativos da aplicação.

## 📂 Estrutura do projeto

```text
Raizes-Do-Nordeste/
│
├── index.html
│
├── css/
│   └── arquivos de estilo
│
├── js/
│   └── scripts da aplicação
│
└── pages/
    └── páginas complementares
```

## ⚠️ Observação

Este projeto possui finalidade **exclusivamente acadêmica**.

As operações de autenticação, pagamento, pedidos e persistência de dados são simuladas no Front-end.

Em uma aplicação real, essas funcionalidades deverão utilizar APIs, banco de dados, autenticação segura e integração com gateways de pagamento.

Projeto desenvolvido para atividade acadêmica de Desenvolvimento Front-end.

## 📚 Conceitos aplicados

Durante o desenvolvimento foram trabalhados conceitos de:

- Desenvolvimento Front-end;
- HTML semântico;
- CSS responsivo;
- JavaScript;
- DOM;
- LocalStorage;
- Mobile-first;
- UX/UI;
- Requisitos funcionais e não funcionais;
- UML e casos de uso;
- Jornada do usuário;
- LGPD;
- Testes de software;
- Integração com serviços externos;
- Git e versionamento;
- Publicação Web com GitHub Pages.
