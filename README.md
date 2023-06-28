# process-file - ACME Corp <br />

Sistema de processamento de transações via arquivo. <br /> <br />
Este é um desafio técnico, que tem como base o envio de um arquivo de transações,
que deverá ser processado e normalizado no banco de dados. <br /><br />
O sistema possui um painel administrativo para que o usuário possa enviar um arquivo de transações
via formulário. <br />


---

## Tecnologias

### Backend
O projeto foi desenvolvido a utilizar Nest.js, um framework versátil para a criação de servidores escaláveis. <br /> <br />
A comunicação é feita a utilizar API REST com o sistema. <br /> <br />
Foi configurado Sequelize como ORM do sistema, por facilidade de implementação. <br /> <br />

### Frontend
Como front end, foi utilizado o pacote do AdminJS, que utiliza ReacJS por debaixo dos panos. <br /> <br />
A versão teve que ser configurada manualmente para 6.8.7, pois a versão ^7.0.0 apresenta incompatibilidades com NestJS,
pois esta versão mais recente do AdminJS foi convertida para ESM, enquanto NestJS se mantém como CJS (até o momento da criação deste projeto). <br /> <br />

### Banco de dados
Como banco de dados, o projeto está configurado com o Postgres. <br /> <br />
Poderá verificar todo o sistema através do PGAdmin, configurado e pronto para ser acessado. <br /> <br />
Ao acessar o PGAdmin, basta navegar entre os itens para visualizar as tabelas: <br />
- docker_postgres_group
  - docker_postgres
    - Databases
      - Develop
        - Schemas
          - public
            - Tables
   
### Filas
Para o processamento de filas, foi utilizado o Redis para o armazenamento temporário dos ids dos arquivos a serem processados. <br /> <br />
O backend NestJS está configurado com BullJS para a comunicação com o Redis e todo o processamento dos Jobs. <br /> <br />
O sistema possui um scheduler para verificar e colocar os itens na fila de processamento. <br /> <br />

### Docker
O projeto e o seu ambiente está configurado para ser rodado dentro de containeres Docker, com o facilitador Docker Compose.

---

## Ambiente

### Subindo o ambiente
Para montar e subir o ambiente, basta seguir os passos abaixo:  <br /> <br />

1. Clonar o repositório: <br />
   `git clone https://github.com/AndreD23/process-file.git`
2. Entrar na pasta do projeto: <br />
   `cd process-file`
3. Gerar o arquivo .env: <br />
   `cp .env.example .env`
4. Executar docker compose para subir os serviços: <br />
   `docker-compose up --build`

<br />
Com isso, a aplicação estará rodando e escutando em localhost. <br /> <br />

### Seeding de Usuários

Na primeira execução do projeto, não há usuários cadatrados. <br />
Para testar, poderá rodar o seed do projeto para carregar usuários padrão no sistema
através do comando abaixo:
```
docker-compose exec app npm run db:seed
```

<br />

### Acessando o projeto

Poderá acessar o sistema através dos links listados abaixo:<br />

- Hello World do NestJS: http://localhost:3000/ <br /> <br />
  
- Painel Administrativo: http://localhost:3000/admin  <br /> 
  Usuários para login:<br />
  - Admin:
    - E-mail: `admin@example.com`
    - Senha: `secret` 
  - Manager:
     - E-mail: `manager@example.com`
     - Senha: `secret`
  - Developer:
     - E-mail: `dev@example.com`
     - Senha: `secret` <br /><br />
   
- Banco de dados PGAdmin: http://localhost:8000/  <br />
  - E-mail: `admin@example.com`
  - Senha: `secret` <br /><br />
   
- Documentação da API com Swagger: http://localhost:3000/api  <br />




---

## Execução do Projeto

Para testar o envio de transações via formulário do painel administrativo, basta seguir os seguintes passos:  <br />
- Acessar o painel administrativo.
- Fazer login no sistema.
- Navegar até **Arquivo de Transações**
- Clicar no botão **+ Criar novo**
- Preencher o formulário com:
  - Situação **Pendente**
  - Notas: deixar em branco
  - Anexo: selecionar o arquivo em **examples/sales.txt**

<br /> <br />

Para testar a API de envio de transações do projeto, basta seguir um dos três passos:  <br />
1. Utilizar o arquivo *api.http* da pasta raiz do projeto. <br />
   Algumas IDEs possuem plugins para testes de requisição, e poderá utilizar este arquivo para executar os testes. <br />
   Basta rodar o POST denominado "Send Transaction File" para ver seu funcionamento. <br /> <br />
   
2. Disparar a requisição via Postman. Para isso, basta preencher com os seguintes dados: <br />
POST: http://localhost:3000/transactions-file <br />
Body:
   - selecionar `form-data`
   - Key `file` como tipo File.
   - Value selecionar o arquivo em **examples/sales.txt** <br /> <br />
   
3. Disparar a requisição via documentação da API com Swagger. Para isso, basta seguir os seguintes passos:  <br />
    - Navegar até a categoria *transactions-file* <br />
    - Expandir `POST /transactions-file`
    - Clicar em *Try it out*
    - Em *file*, selecionar o arquivo em  *examples/sales.txt*
    - Clicar em *Execute*









