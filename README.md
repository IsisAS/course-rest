# API de Plataforma de Cursos

## 📘 Visão Geral

Esta é uma API REST completa para uma plataforma de inscrição de cursos, desenvolvida em TypeScript com Node.js, Express e MongoDB. A API utiliza princípios de Programação Orientada a Objetos (OOP) e permite o cadastro de alunos, autenticação, visualização de cursos disponíveis e gerenciamento de inscrições.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas baseada em princípios OOP:

- **Controllers** - Camada de apresentação que gerencia requisições HTTP
- **Services** - Camada de lógica de negócio que implementa as regras da aplicação
- **Repositories** - Camada de acesso a dados que abstrai operações do banco
- **Models** - Camada de dados que define estruturas e validações
- **Base Classes** - Classes abstratas que fornecem funcionalidades comuns

## 🧰 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **CORS** - Controle de acesso entre origens
- **Scalar** - Documentação moderna de API
- **Swagger/OpenAPI** - Especificação de API

## ⚙️ Instalação e Configuração

### ✅ Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (versão 4.4 ou superior)
- npm ou yarn

### 🚀 Passos para Instalação

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone <repository-url>
   cd course-rest
   npm install
   ```

2. **Configure o banco de dados MongoDB:**
   ```bash
   # Usando Docker (recomendado)
   docker compose -f docker-compose.yml up -d
   
   # Ou instale MongoDB localmente
   # https://docs.mongodb.com/manual/installation/
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   PORT=4000
   HOST=0.0.0.0
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/course_platform
   COUNTRY_LOCALES=ptBR
   ```

4. **Inicie o projeto:**
   ```bash
   npm run dev
   ```

5. **Popular dados iniciais para os cursos (opcional):**
   ```bash
   npm run init
   ```

## 📜 Scripts Disponíveis

- `npm start` – Inicia a API em produção
- `npm run dev` – Inicia em modo desenvolvimento com hot reload
- `npm run build` – Compila os arquivos TypeScript
- `npm run init` – Popula o banco com dados iniciais de cursos

## 📖 Documentação da API

A API possui documentação interativa completa disponível através de duas interfaces modernas:

### 🎨 Scalar (Interface Principal)
- **URL**: `http://localhost:3001/api/scalar`
- **Características**:
  - Interface moderna com tema roxo elegante
  - Layout responsivo e intuitivo
  - Sidebar escura para navegação
  - Tipografia moderna e cards estilizados
  - Suporte completo à autenticação Bearer Token
  - Documentação completa de todos os endpoints
  - Exemplos de requisições e respostas
  - Esquemas de dados detalhados

### 📋 Swagger UI (Interface Alternativa)
- **URL**: `http://localhost:3001/api/docs`
- **Características**:
  - Interface clássica do Swagger
  - Funcionalidade completa de teste de API
  - Documentação OpenAPI padrão

### 📄 Especificação OpenAPI
- **URL**: `http://localhost:3001/api/docs.json`
- **Formato**: JSON OpenAPI 3.0
- **Uso**: Para integração com outras ferramentas de documentação

### 🔑 Autenticação na Documentação
Para testar endpoints protegidos na documentação:
1. Faça login através do endpoint `/api/auth/login`
2. Copie o token JWT retornado
3. Na interface Scalar ou Swagger, clique em "Authorize"
4. Insira o token no formato: `Bearer seu_token_aqui`

## 🔗 Endpoints da API

### 🔐 Autenticação (`/api/auth`)
- `POST /login` - Fazer login

### 👥 Usuários (`/api/user`)
- `POST /` - Criar usuário
- `GET /` - Listar usuários (com filtros e paginação)
- `GET /:id` - Buscar usuário por ID (com inscrições)
- `PUT /:id/profile` - Atualizar perfil do usuário
- `PUT /:id/password` - Alterar senha do usuário

### 📚 Cursos (`/api/courses`)
- `GET /` - Listar cursos (com filtros e paginação)
- `POST /` - Criar curso
- `GET /:id` - Buscar curso por ID
- `POST /register` - Inscrever usuário em curso
- `POST /cancel` - Cancelar inscrição em curso
- `GET /available/list` - Listar cursos disponíveis
- `GET /popular/list` - Listar cursos populares
- `GET /search/name` - Buscar cursos por nome

### 📝 Inscrições (`/api/enrollments`)
- `GET /` - Listar inscrições (com filtros e paginação)
- `POST /` - Criar inscrição
- `POST /cancel` - Cancelar inscrição
- `POST /reactivate` - Reativar inscrição
- `GET /user/:userId` - Buscar inscrições do usuário
- `GET /course/:courseId` - Buscar inscrições do curso
- `GET /stats` - Estatísticas de inscrições
- `GET /check/:userId/:courseId` - Verificar se usuário está inscrito

## 🏛️ Estrutura do Projeto

```
src/
├── base/                    # Classes base e utilitários
│   ├── base.service.ts     # Serviço base abstrato
│   ├── config/             # Configurações (database, etc.)
│   ├── interfaces/         # Interfaces base
│   ├── models/             # Modelo base
│   └── repositories/       # Repositório base
├── core/                   # Módulos principais
│   ├── api/               # Rotas principais e middleware
│   ├── auth/              # Autenticação
│   ├── course/            # Gestão de cursos
│   ├── enrollment/        # Gestão de inscrições
│   └── user/              # Gestão de usuários
├── utils/                 # Utilitários gerais
└── server.ts             # Ponto de entrada da aplicação
```

## 🔧 Funcionalidades Principais

- ✅ **Autenticação JWT** - Sistema seguro de login
- ✅ **Gestão de Usuários** - CRUD completo com validações
- ✅ **Catálogo de Cursos** - Listagem, busca e filtros avançados
- ✅ **Sistema de Inscrições** - Inscrever, cancelar e reativar
- ✅ **Paginação** - Todas as listagens suportam paginação
- ✅ **Filtros Avançados** - Busca por múltiplos critérios
- ✅ **Validação de Dados** - Validações robustas em todas as operações
- ✅ **Tratamento de Erros** - Respostas consistentes e informativas
- ✅ **Arquitetura OOP** - Código organizado e reutilizável
