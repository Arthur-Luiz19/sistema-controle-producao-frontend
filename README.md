# Sistema de controle de produção - frontend

Sistema de controle de produção industrial desenvolvido com **React**, **TypeScript** e **Redux Toolkit**. Interface moderna e responsiva para gerenciamento de produtos, matérias-primas e capacidade de produção.

## 🔧 Backend

O backend deste sistema está disponível em um repositório separado:

📦 **Repositório:** [sistema-controle-producao-backend](https://github.com/Arthur-Luiz19/sistema-controle-producao-backend)

## Sobre o Projeto

Este frontend faz parte de um sistema completo de controle de produção industrial. A interface permite gerenciar produtos, matérias-primas e calcular a capacidade de produção baseada no estoque disponível.

### ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD de Produtos | Interface completa para criar, editar, visualizar e excluir produtos |
| CRUD de Matérias-Primas | Gerenciamento de insumos com controle de quantidade em estoque |
| Associações | Vinculação de matérias-primas aos produtos com quantidades necessárias |
| Capacidade de Produção | Visualização de quantos produtos podem ser fabricados com o estoque atual |
| Registro de Produção | Interface para registrar produção com baixa automática de estoque |
| Responsividade | Layout adaptável para desktop, tablet e mobile |

## 🛠️ Tecnologias

| Tecnologia | Finalidade |
|------------|------------|
| React | Biblioteca UI |
| TypeScript | Linguagem tipada |
| Redux Toolkit | Gerenciamento de estado |
| RTK Query | Cache e fetch de dados |
| Vite | Build tool e dev server |
| TailwindCSS | Estilização utilitária |
| React Router | Roteamento |
| Vitest | Framework de testes |
| React Testing Library | Testes de componentes |
| ESLint | Linting de código |
| Prettier | Formatação de código |

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend rodando em `http://localhost:3000`

### Verificar Instalação

```bash
node --version    # Deve retornar v18.x ou superior
npm --version     # Deve retornar 8.x ou superior
```

## 🧪 Testes

### Testes Unitários (Vitest)

```bash
# Rodar todos os testes
npm run test

# Rodar em modo watch
npm run test -- --watch

# Rodar com coverage
npm run test -- --coverage

# Rodar com UI
npm run test -- --ui
```

## 📫 Contato

| Canal | Link |
|-------|------|
| Desenvolvedor | [Arthur Luiz da Silva] |
| Email | [arthur.luiz11@hotmail.com] |
| LinkedIn | [linkedin.com/in/arthur-luiz-da-silva](https://linkedin.com/in/arthur-luiz-da-silva) |
| GitHub | [github.com/Arthur-Luiz19](https://github.com/Arthur-Luiz19) |

