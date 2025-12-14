# Task Management

Aplicação **Full Stack** de Gerenciamento de Tarefas, utilizando **Next.js (App Router)**, **Prisma**, **MySQL**, **JWT** com arquitetura de Camadas.

O projeto foca em **autenticação segura**, **controle de acesso por usuário** e **organização de código escalável**, seguindo padrões utilizados em Next.

---

## Stack Utilizada

* **Next.js 14+** (App Router)
* **TypeScript**
* **Prisma ORM**
* **MySQL**
* **JWT (JSON Web Token)**
* **bcrypt** para hash de senha
* **Docker** (setup de banco)

---

## Arquitetura do Projeto

O projeto segue uma separação clara de responsabilidades:

```
src/
 ├─ app/
 │   └─ api/
 │       ├─ auth/
 │       │   ├─ login/route.ts
 │       │   └─ register/route.ts
 │       └─ tasks/
 │           ├─ route.ts          # Listar e criar tarefas
 │           └─ [id]/route.ts     # Buscar e deletar tarefa por ID
 │
 ├─ modules/
 │   ├─ infra/
 │   │   └─ prisma.ts
 │   ├─ users/
 │       ├─ users.repository.ts
 │       ├─ users.service.ts
 │       └─ users.types.ts
 │   └─ tasks/
 │       ├─ tasks.service.ts
 │       ├─ tasks.repository.ts
 │       └─ tasks.types.ts
 │
 └─ utils/
     ├─ hashPassword.ts
     ├─ jwtToken.ts
     ├─ password.ts
     └─ requireAuth.ts
```

---

## Autenticação

A autenticação é feita via **JWT**, utilizando o header:

```
Authorization: Bearer <token>
```

O token é validado por um helper (`requireAuth`) reutilizado em todas as rotas protegidas.

---

## Endpoints Disponíveis

### Autenticação

#### Registrar usuário

```
POST /api/auth/register
```

**Body:**

```json
{
  "name": "Example",
  "email": "example@email.com",
  "password": "Senha@123"
}
```

**Regras:**

* Email único
* Senha forte (mínimo de 8 caracteres)

---

#### Login

```
POST /api/auth/login
```

**Body:**

```json
{
  "email": "example@email.com",
  "password": "Senha@123"
}
```

**Response:**

```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Example",
    "email": "example@email.com"
  }
}
```

---

### Tasks (Rotas protegidas)

#### Listar Tasks do usuário

```
GET /api/tasks
```

Retorna apenas tasks pertencentes ao usuário autenticado.

---

#### Cria task

```
POST /api/tasks
```

**Body:**

```json
{
  "title": "Criar API.js",
  "description": "App Router e JWT",
  "status": "PENDING"
}
```

---

#### Buscar task por ID

```
GET /api/tasks/{id}
```

---

#### Deletar tarefa

```
DELETE /api/tasks/{id}
```

---

## Seguranças

* Hash de senha com **bcrypt**
* JWT assinado com segredo via `.env`
* Usuário só acessa suas próprias tarefas
* Nenhum `userId` é recebido via request (sempre via token)

---

## Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```
DATABASE_URL="mysql://user:password@localhost:3306/database"
JWT_SECRET="senhaJWT"
```

---

## Como executar o projeto

### 1. Instalar dependencias
```
npm install
```
### 2. Subir o banco de dados

```
docker-compose up -d
```

### 3. Rodar migrations

```
npx prisma migrate dev
```

### 4. Iniciar o projeto

```
npm run dev
```

---

## Testes

Processo ainda em desenvolvimento!

## Próximas Etapas

* Filtro por status
* Testes automatizados
* Swagger / OpenAPI
