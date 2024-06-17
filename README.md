# GB API

Esta é uma API REST simples para suprir as necessidades de uma aplicação CRUD com a simulação de uma loja.

O ponto de entrada da aplicação é o arquivo `./src/server.ts`.

O schema da aplicação pode ser encontrado em `./prisma/schema.prisma`.

Os módulos da aplicação podem ser encontrados em `./src/modules`.

O banco de dados está rodando na AWS.

## Comandos

### Instalação

```
yarn install

yarn migrate
```

### Execução

```
yarn dev
```

## API

A API possui os seguintes módulos:

- Users
- Addresses
- Categories
- Products
- Orders
- OrderProducts

Cada um deles com os métodos:

- `POST /{modulo}/`: Criar nova entrada;
- `PUT /{modulo}/{id}/`: Atualizar entrada existente;
- `GET /{modulo}/`: Listar todas as entradas;
- `GET /{modulo}/{id}/`: Buscar uma entrada existente;
- `DELETE /{modulo}/{id}/`: Excluir uma entrada existente;

Com exceção do módulo Users, que também possui:

- `POST /api/users/login/`: Autenticar usuário;

Mais detalhes sobre a API podem ser encontrados no Swagger, executando a aplicação e acessando:

```
http://localhost:3333/swagger
```
