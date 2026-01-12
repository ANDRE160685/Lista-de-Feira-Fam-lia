Lista de Feira Família

Uma aplicação web leve e responsiva para gerenciamento de listas de compras individuais para membros da família, com cálculo automático de valores e integração para compartilhamento via WhatsApp.

Funcionalidades:

    Sistema de Acesso: Login simples para proteção básica dos dados.

    Multi-usuários: Dashboards separados para diferentes membros da família (André, Karla, Marileide, Robson, etc.).

    Gerenciamento de Itens (CRUD): Adicione, edite, visualize e exclua itens da sua lista.

    Cálculo Automático: Soma em tempo real do valor unitário versus quantidade e exibição do Total Geral.

    Persistência Local: Os dados são salvos no localStorage do navegador, garantindo que a lista não se perca ao fechar a aba.

    Compartilhamento: Exportação formatada da lista diretamente para o WhatsApp.

    Busca em Tempo Real: Filtro de itens por nome diretamente no campo de inserção.

Tecnologias Utilizadas:

Este projeto foi construído utilizando o trio fundamental do desenvolvimento web:

    HTML5: Estruturação semântica das telas de login, dashboard e listas.

    CSS3: Estilização moderna com variáveis (Custom Properties), Grid Layout e Flexbox para total responsividade.

    JavaScript (Vanilla): Lógica de manipulação de DOM, gerenciamento de estado e persistência de dados.

Como usar:

    Acesso: * Usuário: familiar

        Senha: 123

    Dashboard: Selecione o seu nome na grade de usuários para abrir sua lista pessoal.

    Adicionar Item: Preencha o nome, quantidade e valor unitário. Clique em Salvar.

    Editar/Excluir: Utilize os ícones de lápis (✏️) para editar ou lixeira (🗑️) para remover itens.

    WhatsApp: Clique no botão "WhatsApp" para gerar uma mensagem formatada com todos os itens e o total da compra.

Estrutura de Arquivos:

Plaintext

├── index.html   # Estrutura principal e telas do sistema
├── style.css    # Definições de cores, fontes e layout responsivo
└── script.js    # Lógica de negócio, login e armazenamento

Responsividade:

O projeto foi desenhado com foco em Mobile-First, garantindo que a experiência de uso no supermercado através do celular seja fluida e intuitiva.

Licença:

Este projeto é de uso livre para fins educacionais ou organização pessoal.