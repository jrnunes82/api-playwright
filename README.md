# Automação de Testes de API REST - ServeRest

Este repositório contém a suíte de testes automatizados de API para a plataforma [ServeRest](https://serverest.dev/), desenvolvida como parte de um desafio técnico.

## 🚀 Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework de Teste:** [Playwright Test](https://playwright.dev/)
- **CI/CD:** GitHub Actions
- **Relatórios:** Playwright HTML Reporter

---

## 📋 Cobertura dos Testes

A suíte cobre 100% dos endpoints solicitados e regras de negócio da API de Usuários e Autenticação:

### 🔐 Autenticação (`/login`)
- **POST /login:** Autenticação com credenciais válidas e retorno do token JWT.
- **POST /login:** Validação de falha ao tentar autenticar com credenciais inválidas (HTTP 401).

### 👤 Gestão de Usuários (`/usuarios`)
- **POST /usuarios:** Cadastro de novo usuário com dados dinâmicos.
- **GET /usuarios:** Listagem geral de usuários cadastrados.
- **GET /usuarios/{_id}:** Consulta de detalhes de um usuário específico por ID.
- **PUT /usuarios/{_id}:** Atualização cadastral de dados do usuário.
- **DELETE /usuarios/{_id}:** Remoção de usuário por ID.
- **GET /usuarios/{_id}:** Validação de busca por usuário excluído/inexistente (HTTP 400).

---

## ⚙️ Configuração do Ambiente e Execução Local

### Pré-requisitos
- **Node.js:** v18 ou superior instalado.

### Passos para execução

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/jrnunes82/api-playwright.git](https://github.com/jrnunes82/api-playwright.git)
   cd api-playwright