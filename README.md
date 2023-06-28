# process-file - ACME Corp <br />

File transaction processing system. <br /> <br />

This is a technical challenge, which is based on sending a transaction file, which must be processed and normalized in the database. <br /><br />

The system has an administrative panel so that the user can send a transaction file via form. <br />


---

## Technologies

### Backend

The project was developed using Nest.js, a versatile framework for creating scalable servers. <br /> <br />

The communication is made using REST API with the system. <br /> <br />

Sequelize was configured as the system's ORM, for ease of implementation. <br /> <br />

### Frontend

As a front end, the AdminJS package was used, which uses ReacJS under the hood. <br /> <br />

The version had to be manually set to 6.8.7. Version ^7.0.0 has incompatibilities with NestJS,
as this latest version of AdminJS has been converted to ESM, while NestJS remains CJS (as of this project's creation). <br /> <br />

### Databases

As a database, the project is configured with Postgres. <br /> <br />

You can check the entire system through PGAdmin, configured and ready to be accessed. <br /> <br />

When accessing PGAdmin, just navigate between the items to view the tables: <br />
- docker_postgres_group
  - docker_postgres
    - Databases
      - Develop
        - Schemas
          - public
            - Tables
    

### Queues

For queue processing, Redis was used to temporarily store the ids of the files to be processed. <br /> <br />

The NestJS backend is configured with BullJS for communication with Redis and all Job processing. <br /> <br />

The system has a scheduler to check and queue items for processing. <br /> <br />

### Docker

The project and its environment are configured to run inside Docker containers, with the Docker Compose enabler.

---

## Environment

### Up the environment

To mount and upload the environment, just follow the steps below:  <br /> <br />

1. Clone the repository: <br />
   `git clone https://github.com/AndreD23/process-file.git`
2. Enter the project folder: <br />
   `cd process-file`
3. Generate the .env file: <br />
   `cp .env.example .env`
4. Run docker compose to load the services: <br />
   `docker-compose up --build`

<br />
With that, the application will be running and listening on localhost. <br /> <br />

### Seeding de Usuários

In the first execution of the project, there are no registered users. <br />

To test it out, you can run the project seed to load standard users into the system.
through the command below:
```
docker-compose exec app npm run db:seed
```

<br />

### Accessing the project

You can access the system through the links listed below: <br />

- Hello World from NestJS: http://localhost:3000/ <br /> <br />
  
- Admin Panel: http://localhost:3000/admin  <br /> 
  Login Users:<br />
  - Admin:
    - E-mail: `admin@example.com`
    - Pass: `secret` 
  - Manager:
     - E-mail: `manager@example.com`
     - Pass: `secret`
  - Developer:
     - E-mail: `dev@example.com`
     - Pass: `secret` <br /><br />
   
- Database with PGAdmin: http://localhost:8000/  <br />
  - E-mail: `admin@example.com`
  - Pass: `secret` <br /><br />
<br/ >

If the PGAdmin panel asks for **docker_postgres** password, just enter `secret`<br /><br />

- API documentation with Swagger: http://localhost:3000/api  <br />




---

## Project Execution

To test the sending of transactions via the administrative panel form, just follow these steps:  <br />
- Access the administrative panel.
- Log in to the system.
- Navigate to **Arquivo de Transações**
- Click on the button **+ Criar novo**
- Fill in the form with:
  - Situação **Pendente**
  - Notas: leave blank
  - Anexo: select the file in **examples/sales.txt**

<br /> <br />

To test the project's transaction submission API, just follow one of the three steps: <br />
1. Use the *api.http* file from the project's root folder. <br />
   Some IDEs have plugins for request tests, and you can use this file to run the tests. <br />
   Just run the POST called "Send Transaction File" to see how it works. <br /> <br />
   
2. Trigger the request via Postman. To do this, simply fill in the following data: <br />
POST: http://localhost:3000/transactions-file <br />
Body:
   - Select `form-data`
   - Key `file` with File type.
   - Value select file in **examples/sales.txt** <br /> <br />
   
3. Trigger the request via API documentation with Swagger. To do this, just follow these steps:  <br />
    - Navigate to category *transactions-file* <br />
    - Expand `POST /transactions-file`
    - Click on *Try it out*
    - In *file*, select the file in *examples/sales.txt*
    - Clico on *Execute*
    
