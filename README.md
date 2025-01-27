# Projeto Next.js + Prisma + PostgreSQL + Docker

Este projeto é uma aplicação simples construída com **Next.js**, **Prisma** e **PostgreSQL**, configurada para rodar em **containers Docker**. A aplicação expõe uma API RESTful para gerenciar artigos.

## Requisitos

Antes de iniciar, certifique-se de ter o Docker e o Docker Compose instalados no seu sistema.

## Passos para Iniciar

### 1. Configuração do Docker

1. Crie uma cópia do arquivo `docker-compose.yml.example` e renomeie para `docker-compose.yml`.

```bash
cp docker-compose.yml.example docker-compose.yml
```
#### Docker Compose
Aqui está o conteúdo do arquivo docker-compose.yml que define os containers do PostgreSQL e pgAdmin:
```bash
version: '3.9'
services:
  postgresql:
    container_name: postgresql-dev
    image: postgres:15-alpine
    restart: always
    user: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    command:
      - 'postgres'
      - '-c'
      - 'log_statement=all'
    environment:
      - LC_ALL=C.UTF-8
      - POSTGRES_USER=$POSTGRES_USER
      - POSTGRES_PASSWORD=$POSTGRES_PASSWORD
      - POSTGRES_DB=$POSTGRES_DB
    logging:
      options:
        max-size: 10m
        max-file: '3'
    ports:
      - '15432:5432'
    networks:
      - postgres-dev
  pgadmin:
    container_name: pgadmin-dev
    image: dpage/pgadmin4
    restart: unless-stopped
    volumes:
      - pgadmin:/var/lib/pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: $PGADMIN_DEFAULT_EMAIL
      PGADMIN_DEFAULT_PASSWORD: $PGADMIN_DEFAULT_PASSWORD
      PGADMIN_CONFIG_SERVER_MODE: 'False'
    ports:
      - 5050:80
    networks:
      - postgres-dev
volumes:
  pgdata:
    driver: local
    driver_opts:
      o: bind
      type: none
      device: C:/Users/SEU-NOME-DE-USUÁRIO/docker-volumes/postgresql/dev/data
  pgadmin:
    driver: local
    driver_opts:
      o: bind
      type: none
      device: C:/Users/SEU-NOME-DE-USUÁRIO/docker-volumes/pgadmin/dev
networks:
  postgres-dev:
    driver: bridge
```
2. Modifique o nome de usuário, senha e banco de dados no arquivo .env para as configurações desejadas.

### 2. Rodando o Docker

Execute o seguinte comando para subir os containers:

```bash
docker-compose up -d
```
Isso irá inicializar o PostgreSQL e o pgAdmin.

### 3. Acessando o pgAdmin
Na pasta raiz do projeto, crie uma pasta chamada ./config/.env.dev; nesse arquivo. coloque as seguintes informações:
```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=1234567890
POSTGRES_DB=admin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```
**Pode substituir as informações acima pelas que você quiser**

Após criar a pasta e rodar os containers, acesse o pgAdmin pelo link:

```bash
http://localhost:5050
```
No pgAdmin, clique em **ADD NEW SERVER** e crie um servidor de banco de dados usando as credenciais definidas no arquivo .env.dev

### 4. Configuração do Prisma
Crie uma cópia do arquivo .env.example para .env e configure a URL de conexão com o banco de dados.
```bash
cp .env.example .env
```
No arquivo .env, a variável DATABASE_URL deverá apontar para o seu banco de dados PostgreSQL, como mostrado abaixo:
```bash
DATABASE_URL="postgresql://admin:1234567890@localhost:15432/admin?schema=public"
```
**Se tiver substituído os nomes do arquivo ./config/.env.dev, precisa mudar aqui também!**

### 5. Gerando o Prisma Client
Para que o Prisma funcione corretamente, execute os seguintes comandos:
```bash
npx prisma migrate dev
npx prisma generate
```
### 6. Rodando o Next.js
Após configurar o banco de dados e o Prisma, você pode iniciar a aplicação Next.js com:
```bash
npm install
npm run dev
```
A aplicação estará disponível em http://localhost:3000.
## Como Usar a API
### Endpoints da API
Você pode interagir com a API através de Postman ou qualquer ferramenta semelhante. Aqui estão os principais endpoints para criação, leitura, atualização e exclusão de artigos:
- POST para criar um artigo:
```bash
http://localhost:3000/api/articles/
```
- GET para listar todos os artigos:
```bash
http://localhost:3000/api/articles/
```
- PUT para atualizar um artigo específico (substitua 3 pelo ID do artigo):
```bash
http://localhost:3000/api/articles/3
```
- DELETE para excluir um artigo específico (substitua 3 pelo ID do artigo):
```bash
http://localhost:3000/api/articles/3
```
## Exemplo de Corpo de Requisição para Criar um Artigo (POST)
```bash
{
  "title": "Meu primeiro artigo",
  "description": "Descrição do artigo",
  "body": "Conteúdo do artigo"
}
```
## Conclusão
Agora sua aplicação Next.js com Prisma e PostgreSQL está configurada para rodar em Docker. Você pode usar a API para gerenciar artigos e acessar o banco de dados via pgAdmin.