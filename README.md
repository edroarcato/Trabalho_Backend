<!-- CONFIGURACAO: -->

1. Clone o repositório:

git clone https://github.com/edroarcato/Trabalho_Backend.git
cd Trabalho_Backend


2. Instale as dependências:

npx express-generator API_REST --no-view
npm install
npm install express mongoose jsonwebtoken dotenv
npm install --save-dev supertest jest


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

Authorization: Bearer <seu_token_aqui>



<!-- DEPENDENCIAS: -->

1. Dependências de produção

Essas são necessárias para o funcionamento da API:

npm install express       
npm install mongoose      
npm install jsonwebtoken  
npm install dotenv               

2. Dependências de desenvolvimento

Essas são utilizadas apenas durante testes e desenvolvimento:

npm install --save-dev jest       
npm install --save-dev supertest 



<!-- COMO RODAR OS TESTES: -->

1. Certifique-se de que as dependências de desenvolvimento estão instaladas

npm install


2. Execute os testes

npm run test

Este comando executa todos os testes definidos em tests/tarefasRouter.test.js usando o Jest e Supertest.


3. O que esperar ao rodar os testes

Testes de criação de tarefas (POST):
	• Deve retornar 201 para criação bem-sucedida.
	• Deve retornar 422 se o nome for inválido (curto ou vazio).

Testes de leitura (GET):
	• Deve retornar 200 e um array de tarefas.
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

1. Criar uma tarefa (POST /tarefas)

Request:

POST /tarefas
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Estudar Node.js"
}


Response (201 – Criado):

{
  "id": "652e9b9f2f4e4a1a3c5f7e12",
  "nome": "Estudar Node.js",
  "concluida": false
}


Response (422 – Nome inválido):

{
  "msg": "Nome da tarefa deve ter pelo menos 3 caracteres"
}


2. Listar todas as tarefas (GET /tarefas)

Request:

GET /tarefas


Response (200 – OK):

[
  {
    "id": "652e9b9f2f4e4a1a3c5f7e12",
    "nome": "Estudar Node.js",
    "concluida": false
  },
  {
    "id": "652e9baf2f4e4a1a3c5f7e13",
    "nome": "Fazer exercícios",
    "concluida": true
  }
]


3. Obter uma tarefa por ID (GET /tarefas/:id)

Request:

GET /tarefas/652e9b9f2f4e4a1a3c5f7e12


Response (200 – OK):

{
  "id": "652e9b9f2f4e4a1a3c5f7e12",
  "nome": "Estudar Node.js",
  "concluida": false
}


Response (400 – ID inválido):

{
  "msg": "ID invalido"
}


Response (404 – Não encontrado):

{
  "msg": "Tarefa não encontrada"
}


4. Atualizar uma tarefa (PUT /tarefas/:id)

Request:

PUT /tarefas/652e9b9f2f4e4a1a3c5f7e12
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Estudar Node.js e Express",
  "concluida": true
}


Response (200 – OK):

{
  "id": "652e9b9f2f4e4a1a3c5f7e12",
  "nome": "Estudar Node.js e Express",
  "concluida": true
}


Response (422 – Nome inválido):

{
  "msg": "Nome da tarefa é obrigatório"
}


Response (400 – ID inválido):

{
  "msg": "ID invalido"
}


Response (404 – Não encontrado):

{
  "msg": "Tarefa não encontrada"
}


5. Deletar uma tarefa (DELETE /tarefas/:id)

Request:

DELETE /tarefas/652e9b9f2f4e4a1a3c5f7e12
Authorization: Bearer <token>


Response (204 – Sem conteúdo):

HTTP/1.1 204 No Content


Response (400 – ID inválido):

{
  "msg": "ID invalido"
}


Response (404 – Não encontrado):

{
  "msg": "Tarefa não encontrada"
}



<!-- INTEGRANTES DO GRUPO: -->

Nome: Pedro Araújo Marcato
Matrícula: 2324291026



<!-- DIVISAO DE TAREFAS: -->

Como fiz o trabalho individualmente, não houve divisao de tarefas!