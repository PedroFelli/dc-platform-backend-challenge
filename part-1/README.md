###  FORMAT: 1.0


# Desafio 
  Um simples repositório para gerenciar cadastro e atualização de produtos.
  O desafio consistia em negar requições de atualização de produto repetidas com o prazo menor de 10 min.
  Para resolução o body do request foi armazeado em um cache, e quando o usuario faz o pedido de atualização a api confere se a ultima atualização tem o prazo menor de 10 min e se é iqual ao ultimo pedido de atualização.



# Tecnologias
Tecnologias utilizadas:

* [Typescript](https://www.typescriptlang.org/)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [TypeORM](http://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Jest](https://jestjs.io/)
* [ioredis](https://github.com/luin/ioredis)

# Requisitos

1.  Banco Postgres e um [redis cache](https://hub.docker.com/_/redis).
2.  NPM ou Yarn.
2.  NodeJS.



# Instalação

### Project
1.  Clone o repositório:

          git clone https://github.com/PedroFelli/

2. Copie o arquivo `.env-exemplo` para `.env`.
3. No arquivo `.env`, altere as variaveis com as configurações do seu banco redis.
4. No arquivo `ormconfig.json`, altere as variaveis com as configurações do seu banco postgres. 
5. Rode `npm install` ou `yarn` para instalar as dependencias.
7. Rode `yarn typeorm migration:run` para instalar as migrations.
6. Após instalar as dependencias `npm run start` ou `yarn start` para rodar a api .



## Testes
Para rodar os testes `npm test` ou `yarn test`.

# Data Structures

## Product (object)
+ name: "Mesa" (string)
+ description: "Mesa para Escritório"(string)


# Product

## Cadastrar um novo produto.

+ Request (application/json)

  `POST /products/`
    + Body

            {
              "name": "Mesa",
              "description": "Mesa para Escritório"
            },

  + Response 200 (application/json)

            {
              "name": "Mesa",
              "description": "Mesa para Escritório"
              "id": 1,
              "created_at": "2020-08-29T19:48:21.877Z",
              "updated_at": "2020-08-29T19:48:21.877Z"
            }


## Alterar informações do produto.

+ Request (application/json)

  `PUT /products/`
    + Body

            {
              "id": 1,
              "name": "Mesa",
              "description": "Mesa para quarto"
            },

  + Response 200 (application/json)

            {
              "name": "Mesa",
              "description": "Mesa para quarto"
              "id": 1,
              "created_at": "2020-08-29T19:48:21.877Z",
              "updated_at": "2020-08-29T19:48:21.877Z"
            }


  Caso a alteração de um produto seja feito em menos de 10 min, ele confere o corpo da requisição. Se iqual o ultimo enviado ele retorna: 

     + Response 403 (application/json)

            {
              "message": "Duplicate request in less than 10 min"
            }
        


