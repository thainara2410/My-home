# My Home - Sistema de Gerenciamento de Imóveis

## Visão Geral do Produto

O sistema "My Home" é uma aplicação web de gerenciamento de imóveis projetada para auxiliar empresas de gestão imobiliária na eficiente administração de propriedades locativas. Esse sistema simplifica o acompanhamento das propriedades, seus Clientes e os contratos de aluguel associados.

## Tecnologias Utilizadas

- Linguagens: Java 17, TypeScript v5, JavaScript 
- Frameworks: Spring Boot 2.7, React (versão 18)
- Banco de Dados: MySQL v8
- Servidor: AWS
- HTML v5
- CSS v3

## Principais Funcionalidades

### Gestão de Propriedades

- Listar e pesquisar propriedades com informações detalhadas, como endereço, tipo, número de quartos, etc.
- Adição, atualização e exclusão de propriedades.

### Gestão de Clientes

- Cadastro de Clientes com informações pessoais e de contato.
- Consultar e listar clientes.
- Atualização e exclusão de Clientes.

### Contratos de Aluguel

- Registro de contratos de aluguel, incluindo datas de início e término, valores, termos e condições.
- Atualização e exclusão de contratos.
- Consultar e listar contratos.

### Gestão de Funcionários 

- Editar usuário (user) ou administrador.
- Visualizar e listar usuário (user) e adiministardores.
- Desativar usuários(user) e Administradores.

## Tipos de Usuários

- **Administradores (ADMIN):** Têm acesso completo a todas as funcionalidades do sistema, incluindo a criação, edição e exclusão de propriedades, inquilinos e contratos. Podem gerar relatórios detalhados e acompanhar o desempenho financeiro.

- **Agentes de Locação (USER):** Podem visualizar informações sobre propriedades disponíveis e manter registros de inquilinos em potencial.

## Padrões de Commit

- Utilize mensagens de commit descritivas que expliquem as mudanças realizadas.
- Use verbos no imperativo (ex. "Adicione uma nova funcionalidade" em vez de "Adicionado uma nova funcionalidade").
- Adicione um identificador de problema se estiver vinculado a um problema de rastreamento (por exemplo, "Adicione #123 para corrigir o problema #123").

## Uso de Branches

- Mantenha master (ou main) como a branch principal e estável.
- Crie branches de recursos ou tarefas separadas para desenvolvimento, por exemplo, feature/nova-funcionalidade ou bugfix/correcao-de-bug.
- Use branches de lançamento (como release/v1.0) para preparar versões para produção.

## Estrutura de Diretório

My-home/  
|-- Myhome-FrontEnd/  
|-- Myhome-BackEnd /  
|-- PadroesAdotados/  
|-- Requisitos/  
|-- README.md

## Organização

- A parte de código devem estar nas pastas "Myhome-BackEnd" ou "Myhome-FrontEnd" e as documentações devem estar na pasta "Requisitos".

## Boas Práticas de Codificação

- Utilizar o padrão de nomenclatura Camel Case em classes, métodos e variáveis.
- Métodos, nomes de variáveis e etc. devem possuir nomes que signicam alguma coisa em relação ao seu objetivo.
- Nome de classes devem ser substantivos e não conter verbos. Já nomes de métodos devem conter verbos pois eles indicam ações.
- Evitar comentários desnecessários, quando a própria função deixa claro o que está sendo feito não é necessário o uso de comentários.
- Cada função, classe ou módulo deve ter uma única responsabilidade, para torna o código mais legível e organizado.
- Formatar de forma clara e padronizada o escopo das classes, métodos, estruturas condicionais, estruturas de repetição.



