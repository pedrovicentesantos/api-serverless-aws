# Projeto

A aplicação consiste em uma REST API Serverless feita em Node.js que utiliza os serviços da AWS.

A API se comunica com um Banco de Dados DynamoDB para salvar seus dados, que neste caso são tratados como se fossem artigos.

## Ferramentas e serviços utilizados

Para o desenvolvimento é utilizado:

- [Framework Serverless](https://www.serverless.com) para facilitar o deploy da aplicação

Os serviços da AWS utilizados são:

- API Gateway 
  * Gerenciamento da API
- CloudFormation 
  * Facilitar a definição e provisionamento dos recursos necessários
- Bucket S3 
  * Onde ficam os arquivos da aplicação
- AWS Lambda 
  * Contém as lambda functions para cada rota da API
- Banco de Dados DynamoDB

## Endpoints

As rotas presentes na aplicação são:

- GET /dev/articles
  * Retorna um array com todos os objetos no BD
- GET /dev/articles/<articleId>
  * Retorna o artigo identificado por `articleId`
- POST /dev/articles
  * Cria um novo artigo
- PUT /dev/articles/<articleId>
  * Edita os campos do artigo identificado por `articleId`
- DELETE /dev/articles/<articleId>
  * Remove o artigo identificado por `articleId` do BD

## Fazendo o deploy

Para testar a aplicação é necessário ter uma conta na AWS e um usuário com acesso de admin criado no Identity and Access Management (IAM). Além disso, é necessário ter instalado o framework Serverless, o que pode ser feito com `npm i -g serverless`.

Cumprindo esses requisitos, basta baixar o repositório, acessá-lo e fazer o deploy da aplicação na sua conta da AWS:

```
git clone https://github.com/pedrovicentesantos/api-serverless-aws

cd api-serverless-aws

serverless deploy
```

Feito isto, a API já estará funcionando e poderá ser acessada na URL da AWS, que pode ser obtida pelo console do comando ou na própria AWS.
