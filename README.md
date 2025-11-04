# API REST - Sistema de Livros com Autenticação JWT

API desenvolvida em Node.js + Express + MongoDB com autenticação JWT e CRUD completo para o recurso Livros.  
O sistema permite cadastrar usuários, realizar login e gerenciar livros autenticados.

<!-- CONFIGURACAO: -->

1. Clone o repositório:

git clone https://github.com/edroarcato/Trabalho_Backend.git
cd Trabalho_Backend


2. Instale as dependências:

npm install
npm install express mongoose jsonwebtoken dotenv bcrypt
npm install --save-dev supertest jest nodemon


3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

MONGODB_USER=usrTarefas
MONGODB_PASS=abcd1234
MONGODB_HOST=bd-academico.kvvoqpc.mongodb.net
MONGODB_DBNAME=API_REST
JWT_SEGREDO=abcd1234


Ajuste os valores conforme seu ambiente e credenciais do MongoDB.



<!-- EXECUCAO: -->

1. Certifique-se de que todas as dependências foram instaladas e o arquivo .env está configurado corretamente.

2. Para rodar a aplicação em modo de desenvolvimento:

npm run dev


3. Para rodar os testes da aplicação:

npm run test


4. Ao iniciar a aplicação, você deverá ver no console:

Conectado ao MongoDB


5. Endpoints protegidos por JWT exigem o header Authorization:

Authorization: Bearer token



<!-- DEPENDENCIAS: -->

1. Dependências de produção

Essas são necessárias para o funcionamento da API:

npm install express       
npm install mongoose      
npm install jsonwebtoken  
npm install dotenv
npm install bcrypt               


2. Dependências de desenvolvimento

Essas são utilizadas apenas durante testes e desenvolvimento:

npm install --save-dev jest       
npm install --save-dev supertest 
npm install --save-dev nodemon



<!-- COMO RODAR OS TESTES: -->

1. Certifique-se de que as dependências de desenvolvimento estão instaladas

npm install


2. Execute os testes

npm run test

Este comando executa todos os testes definidos em tests/livrosRouter.test.js usando o Jest e Supertest.


3. O que esperar ao rodar os testes

Testes de criação de livros (POST):
	• Deve retornar 201 para criação bem-sucedida.
	• Deve retornar 422 se o nome for inválido (curto ou vazio).

Testes de leitura (GET):
	• Deve retornar 200 e um array de livros.
	• Para ID inválido, deve retornar 400.
	• Para ID não encontrado, deve retornar 404.

Testes de atualização (PUT):
	• Deve retornar 200 ao atualizar corretamente.
	• Deve retornar 400 para ID inválido.
	• Deve retornar 404 para ID não encontrado.
	• Deve retornar 422 se o nome for inválido.

Testes de exclusão (DELETE):
	• Deve retornar 204 ao deletar corretamente.
	• Deve retornar 400 para ID inválido.
	• Deve retornar 404 para ID não encontrado.

Observação: Antes de rodar os testes, verifique se o MongoDB está ativo e que as variáveis de ambiente no .env estão corretas.



<!-- EXEMPLOS DE USO: -->

1. Cadastro de usuário

Método: POST
URL: http://localhost:3000/users/register

Headers:

Content-Type: application/json


Body (JSON):

{
  "nome": "SEU NOME",
  "email": "SEU EMAIL",
  "senha": "SUA SENHA"
}


Respostas possíveis:

✅ 201 Created

{
  "id": "671a0e88...",
  "nome": "SEU NOME",
  "email": "SEU EMAIL"
}


⚠️ 422 Unprocessable Entity

{ "msg": "Email já cadastrado" }

2. Login de usuário

Método: POST
URL: http://localhost:3000/users/login

Headers:

Content-Type: application/json


Body (JSON):

{
  "email": "SEU EMAIL",
  "senha": "SUA SENHA"
}


Respostas possíveis:

✅ 200 OK

{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}


⚠️ 401 Unauthorized

{ "msg": "Credenciais inválidas" }


🔐 Importante: O token retornado deve ser usado nos endpoints protegidos, enviando-o no cabeçalho:

Authorization: Bearer token

3. Criar um livro

Método: POST
URL: http://localhost:3000/livros

Headers:

Authorization: Bearer token
Content-Type: application/json


Body (JSON):

{
  "titulo": "Aprendendo Express.js na Prática",
  "autor": "José Reginaldo",
  "publicadoEm": "2024-09-10",
  "disponivel": true
}


Respostas possíveis:

✅ 201 Created

{
  "id": "672a8e9b94a56b0023a48e01",
  "titulo": "Aprendendo Express.js na Prática",
  "autor": "José Reginaldo",
  "publicadoEm": "2024-09-10",
  "disponivel": true
}


⚠️ 422 Unprocessable Entity

{ "msg": "Título deve ter pelo menos 3 caracteres" }


4. Listar todos os livros

Método: GET
URL: http://localhost:3000/livros


Resposta (200 OK):

[
  {
    "_id": "672a9b1f2f4e4a1a3c5f7e20",
    "titulo": "Aprendendo Express.js na Prática",
    "autor": "José Reginaldo",
    "publicadoEm": "2024-09-10T00:00:00.000Z",
    "disponivel": true
  },
  {
    "_id": "672a9baf2f4e4a1a3c5f7e21",
    "titulo": "Node.js para Iniciantes",
    "autor": "Pedro Marcato",
    "publicadoEm": "2025-11-02T00:00:00.000Z",
    "disponivel": true
  }
]


5. Obter um livro por ID

Método: GET
URL: http://localhost:3000/livros/:id

Exemplo:

http://localhost:3000/livros/672a9b1f2f4e4a1a3c5f7e20


Respostas:

✅ 200 OK

{
  "_id": "672a9b1f2f4e4a1a3c5f7e20",
  "titulo": "Aprendendo Express.js na Prática",
  "autor": "José Reginaldo",
  "publicadoEm": "2024-09-10T00:00:00.000Z",
  "disponivel": true
}


⚠️ 400 Bad Request

{ "msg": "ID inválido" }


🚫 404 Not Found

{ "msg": "Livro não encontrado" }


6. Atualizar um livro

Método: PUT
URL: http://localhost:3000/livros/:id

Headers:

Authorization: Bearer token
Content-Type: application/json


Body (JSON):

{
  "titulo": "Express.js Moderno com JWT",
  "disponivel": false
}


Respostas:

✅ 200 OK

{
  "_id": "672a9b1f2f4e4a1a3c5f7e20",
  "titulo": "Express.js Moderno com JWT",
  "autor": "José Reginaldo",
  "publicadoEm": "2024-09-10T00:00:00.000Z",
  "disponivel": false
}


⚠️ 422 Unprocessable Entity

{ "msg": "Título deve ter pelo menos 3 caracteres" }


⚠️ 400 Bad Request

{ "msg": "ID inválido" }


🚫 404 Not Found

{ "msg": "Livro não encontrado" }


7. Deletar um livro

Método: DELETE
URL: http://localhost:3000/livros/:id

Headers:

Authorization: Bearer token


Respostas:

✅ 204 No Content
(sem corpo de resposta)

⚠️ 400 Bad Request

{ "msg": "ID inválido" }


🚫 404 Not Found

{ "msg": "Livro não encontrado" }



<!-- INTEGRANTES DO GRUPO: -->

Nome: Pedro Araújo Marcato
Matrícula: 2324291026



<!-- DIVISAO DE TAREFAS: -->

Como fiz o trabalho individualmente, não houve divisao de tarefas!
