# My Home - Sistema de Gerenciamento de Imóveis

## Visão Geral do Produto

O sistema "My Home" é uma aplicação web de gerenciamento de imóveis projetada para auxiliar empresas de gestão imobiliária na eficiente administração de propriedades locativas. Esse sistema simplifica o acompanhamento das propriedades, seus inquilinos e os contratos de aluguel associados.

## Principais Funcionalidades

### Gestão de Propriedades

- Lista de propriedades com informações detalhadas, como endereço, tipo, número de quartos, etc.
- Adição, atualização e exclusão de propriedades.

### Gestão de Inquilinos

- Cadastro de inquilinos com informações pessoais e de contato.
- Associação de inquilinos a propriedades específicas.
- Histórico de locações de inquilinos.
- Atualização e exclusão de inquilinos.

### Contratos de Aluguel

- Registro de contratos de aluguel, incluindo datas de início e término, valores, termos e condições.
- Atualização e exclusão de contratos.

### Relatórios e Análises

- Geração de relatórios sobre o desempenho financeiro das propriedades.
- Análise da ocupação das propriedades e do histórico de inquilinos.

## Tipos de Usuários

- **Administradores (ADMIN):** Têm acesso completo a todas as funcionalidades do sistema, incluindo a criação, edição e exclusão de propriedades, inquilinos e contratos. Podem gerar relatórios detalhados e acompanhar o desempenho financeiro.

- **Agentes de Locação (USER):** Podem visualizar informações sobre propriedades disponíveis e manter registros de inquilinos em potencial.

## Tecnologias Utilizadas

- Frameworks: Spring Boot (Java), React (JavaScript)
- Banco de Dados: MySQL
- Servidor: AWS

## Padrões de Commit

- Utilize mensagens de commit descritivas que expliquem as mudanças realizadas.
- Use verbos no imperativo (ex. "Adicione uma nova funcionalidade" em vez de "Adicionado uma nova funcionalidade").
- Adicione um identificador de problema se estiver vinculado a um problema de rastreamento (por exemplo, "Adicione #123 para corrigir o problema #123").

## Uso de Branches

- Mantenha master (ou main) como a branch principal e estável.
- Crie branches de recursos ou tarefas separadas para desenvolvimento, por exemplo, feature/nova-funcionalidade ou bugfix/correcao-de-bug.
- Use branches de lançamento (como release/v1.0) para preparar versões para produção.


