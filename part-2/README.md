###  FORMAT: 1.0


# Desafio 
  Um simples repositório para ler dump com lista de URLs de imagens de produtos. O desafio consistia em criar um novo dump juntando as imagens dos itens repetidos, verificando se a url estava quebrada e com no máximo 3 imagens por item.

# Tecnologias
Tecnologias utilizadas:

* [Javascript](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript)
* [Node](https://nodejs.org/en/)
* [Axios](https://www.npmjs.com/package/axios)


# Requisitos

1.  NPM ou Yarn.
2.  NodeJS.


# Instalação

### Project
1. Rode `npm install` ou `yarn` para instalar as dependências.
2. Na linha 6 do `app.js` altere o nome do arquivo que vai ser lido pelo script na função `createReadStream`.
3. Para alterar o nome do novo dump é so alterar o parâmetro da função `createWriteStream` na linha 14.
4. Inicialize o serviço de test das URLS `ruby url-aggregator-api.rb`
5. Em uma nova janela execute `yarn run-dump` para gerar o novo dump.