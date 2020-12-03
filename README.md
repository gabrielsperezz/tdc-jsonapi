# Instalação

1. Clone the repo
2. Execute `npm install`
3. Configure o mongo
4. Execute `npm run start`
5. End points de exemplos:
  - `GET http://localhost:3000/` para ver a documentação criada automaticamente
  - `GET http://localhost:3000/people` para listar as pessoas
  - `POST http://localhost:3000/people` para criar as pessoas
  - `GET http://localhost:3000/articles` para listar os artigos
  - `GET http://localhost:3000/articles?include=author` para listar os artigos e também trazer author  
  - `POST http://localhost:3000/articles` para criar os artigos
