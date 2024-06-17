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

## Detalhes

A aplicação foi construída tendo como base os conceitos de Clean Architecture e Domain-Driven Design. Isso resultou numa abordagem voltada a domínios, aqui tratados como módulos.

Cada módulo possui:

- Um arquivo `schema`, que informa as diretrizes dos dados daquele módulo e garante as restrições;
- Um arquivo `routes`, que expõe as rotas daquele módulo, sendo portanto o arquivo de mais alto nível;
- Um arquivo `controller`, que realiza as operações abstratas prévias à chamada ao banco;
- Um arquivo `service`, que realiza as chamadas ao banco, sendo portanto o arquivo de mais baixo nível;'

Estes arquivos, com exeção do `schema`, dependem apenas do arquivo seguinte na hierarquia, garantindo o mínimo de comportamentos imprevistos ou efeitos colaterais de uma alteração nos módulos.

Isso foi feito visando manter uma clara divisão de responsabilidades entre as diversas partes do projeto, garantindo escalabilidade e fácil compreensão da arquitetura.
