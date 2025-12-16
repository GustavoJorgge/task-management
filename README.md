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
* **bcrypt** para hash de senhas
* **Zod** para validação de dados
* **Docker** (setup do banco de dados)

---

## Arquitetura do Projeto

O projeto segue uma separação clara entre **rotas**, **serviços**, **repositórios** e **validações**, evitando lógica de negócio diretamente nas rotas.

```
src/
 ├─ app/
 │   └─ api/
 │       ├─ auth/
 │       │   ├─ login/route.ts
 │       │   └─ register/route.ts
 │       └─ tasks/
 │           ├─ route.ts          # Listar e criar tasks
 │           └─ [id]/route.ts     # Buscar, atualizar e deletar task por ID
 │
 ├─ modules/
 │   ├─ infra/
 │   │   └─ prisma.ts
 │   ├─ users/
 │   │   ├─ users.repository.ts
 │   │   ├─ users.service.ts
 │   │   ├─ users.schema.ts
 │   │   └─ users.types.ts
 │   └─ tasks/
 │       ├─ tasks.repository.ts
 │       ├─ tasks.service.ts
 │       ├─ tasks.schema.ts
 │       └─ tasks.types.ts
 │
 └─ utils/
     ├─ auth.ts            # hash e compare de senha
     ├─ jwtToken.ts        # geração e validação do JWT
     └─ requireAuth.ts     # middleware/helper de autenticação
```

---

## Autenticação

A autenticação é feita via **JWT**, utilizando o header:

```
Authorization: Bearer <token>
```

O token é validado por um helper reutilizável (`requireAuth`), garantindo que:

* O token seja válido
* O usuário esteja autenticado
* O `userId` seja extraído do token (e nunca recebido via body ou query)

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

**Validações:**

* Email único
* Senha forte (mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial)

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

Todas as rotas abaixo exigem autenticação via JWT.

#### Listar tasks do usuário autenticado

```
GET /api/tasks
```

Retorna apenas as tasks pertencentes ao usuário autenticado.

---

#### Criar task

```
POST /api/tasks
```

**Body:**

```json
{
  "title": "Criar API",
  "description": "App Router com JWT",
  "status": "PENDING"
}
```

---

#### Buscar task por ID

```
GET /api/tasks/{id}
```

---

#### Atualizar task

```
PUT /api/tasks/{id}
```

Campos opcionais:

```json
{
  "title": "Nova task",
  "description": "Descrição atualizada",
  "status": "COMPLETED"
}
```

---

#### Deletar task

```
DELETE /api/tasks/{id}
```

---

## Segurança

* Senhas armazenadas com **bcrypt**
* JWT assinado com segredo via `.env`
* Usuário só pode acessar/manipular suas próprias tasks
* `userId` nunca é recebido via request
* Validação de dados feita com **Zod**

---

## Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```
DATABASE_URL="mysql://user:password@localhost:3306/database"
JWT_SECRET="sua_chave_secreta"
```

---

## ▶️ Como Executar o Projeto

### 1. Instalar dependências

```
npm install
```

### 2. Subir o banco de dados

```
docker-compose up -d
```

### 3. Rodar as migrations

```
npx prisma migrate dev
```

### 4. Iniciar a aplicação

```
npm run dev
```

---

## Testes

Ainda não implementados. Estrutura preparada para inclusão futura.

---

## Próximas Etapas

* Filtro de tasks por status
* Testes automatizados
* Documentação com Swagger / OpenAPI
* Front-end
