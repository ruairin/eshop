# About

This directory (/eshop/eshop-api/) contains the backend for the project. See the top-level README in the root of the repository for an overview of the project. 
The backend app was created with the following technologies:

- [Node.js](https://nodejs.org/en) - Javascript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [knex](https://knexjs.org/) - SQL query builder
- [exoress-session](https://www.npmjs.com/package/express-session)/[Connect Session knex](https://www.npmjs.com/package/connect-session-knex) - Session management

The backend consists of the following components:
- A http server and API
- A PostgreSQL database

# Setup Options
<a id="setup_options"></a>
The API can be configured to run as follows:

1. **Without Docker**: Both the server/API and database run directly (i.e. without Docker containers) on either the same or different machines. See setup instructions for this option [below](#DB_service).

1. **With Docker for API only**: Server/API runs in a Docker container, connects to a conventional PostgreSQL service (i.e. the database does not run in Docker). This option is useful for deploying the server/API to several locations using Docker containers, each connecting to one or more PostgreSQL services. See setup instructions for this option [below](#DB_service).

1. **Both API and database run in Docker containers**: This option can be useful for local development where a postgres service may not be available. See setup instructions for this option [below](#DB_docker).

# Source Structure

The source structure for the most important parts of the backend code is summarised below

```
/eshop/eshop-api/
| -- /controllers/
| -- /db/
| -- /public/
| -- knexfile.js
| -- server.js
| -- .env.example
| -- package.json
| -- README.md
```

| Directory         | Description |
| ---               | --- |
| /controllers/     | Modules implenting the server endpoints |
| /db/              | Databse migration, initialisation |
| /public/          | Static files (e.g. product images) |
| knexfile.js       | Configuration of knex for database interaction |
| server.js         | Main express server source file |
| .env.example      | Sample environment file. This must be renamed to .env and configured before using the app. |
| package.json      | Package file for npm. |
| README.md         | This readme file |

# Database Schema and Initialisation

The database schema is illustrated below. 

Database initialisation is described in the setup sections. Scripts are provided to initialise the database schema and seed the tables with dummy data. 

It should be noted that the seeding is only performed for the products and categories tables shown below. The users, cart_items and login tables are populated via the fontend interface. The sessions table is automatically created by the backend.

![image](../eshop/public/images/DB_schema.svg)

# Docker compose files

Docker compose files are provided in the source directory for the following cases:

- Both server/API and Postgres database running in Docker containers:
    - `docker-compose.dev.withDB.initDB.yml`
    - `docker-compose.dev.withDB.yml`
- Only Server/API runs in Docker container (Postgres running as a local or remote service)
    - ``docker-compose.dev.yml``
    - ``docker-compose.production.yml``

Usage of these files is described in the setup sections

# Setup

As described in [Setup Options](#setup_options) above, three options are available for the application setup:
1. Without Docker
1. With Docker for server/API only (not for database)
1. With Docker for both server/API and database

Setup instructions are provided in the following for each of these options.

## Without Docker or using Docker for server/API only (Setup Options 1 and 2)
<a id="DB_service"></a>
Note: the following assumes that the postgres service is available for connection

1. In a terminal change into the /eshop/eshop-api directory

1. Run npm install

1. Create a new database `($ createdb -U <YOUR POSTGRES USERNAME> -h <POSTGRES HOST> -p <PORT NUMBER> -d <DATABASE NAME>)`

1. Rename .env.example to .env and configure the environment variables to allow connection to the database. A sample .env file is annotated below

    ```
    # ==== Setup Option 1: For local development without docker ====
    # DB_CLIENT represents the service which knex uses to connect to the database.
    # This should be left as 'pg'
    DB_CLIENT=pg
    # DB_HOST represents the host running the postgres service
    DB_HOST=127.0.0.1
    # Access credentials for postgres sevice
    DB_USER=postgres
    DB_PASSWORD=
    # database name
    DB_NAME=eshop
    # postgres service port
    DB_PORT=5432


    # ==== Setup Option 2: Docker for server/API + DB on Localhost  ====
    # DB_CLIENT=pg

    # Using a docker container for the API on localhost
    # with postgres service also running on localhost
    # To access the host from the container, the host
    # must be set as host.docker.internal as follows:
    # DB_HOST=host.docker.internal

    # DB_USER=postgres
    # DB_PASSWORD=
    # DB_NAME=eshop
    # # The port to access the DB from local host
    # DB_PORT=5432
    ```

1. Create the database schema using knex migration `($ npm run migrate)`

1. Initialise the database with dummy values `($ npm run seed)`

1. Start the server:
    - **For Setup Option 1:** To run the server on the current host in development mode: `($ npm run start-dev)`
    - **For Setup Option 2:** To run the server in a docker container in development mode: `($ docker compose -f docker-compose.dev.yml up)

## Using Docker for both postgres database and server/API (Setup Option 3)
<a id="DB_docker"></a>
1. Configure the environment via the .env file. A sample .env is shown below:
    ```
    # ==== Setup Option 3: Docker for both server/API + DB  ====
    # For local development with both node and
    # postgres in docker containers
    # DB_CLIENT=pg
    # DB_HOST=postgres
    # DB_USER=postgres
    # DB_PASSWORD=postgres
    # DB_NAME=eshop
    # DB_PORT=5432
    # POSTGRES_USER=${DB_USER}
    # POSTGRES_PASSWORD=${DB_PASSWORD}
    # POSTGRES_DB=${DB_NAME}
    ```

1. Initialise the database schema and seed data in the postgres docker image `($ docker compose -f docker-compose.dev.withDB.initDB.yml up)`

1. Check the logs to confirm that knex seed:run has completed. Adminer (http://localhost:8080) can be used to check that data was created in the categories and products tables in the database.

1. Stop the docker containers: `($ docker compose -f docker-compose.dev.withDB.initDB.yml down)`

1. Start the docker containers to run in development mode: `($ docker compose -f docker-compose.dev.withDB.yml up)`


## Production Docker-Compose File
A docker-compose file is provided for the purposes of deploying a server image. This is the same as the development compose file (docker-compose.dev.yml) except for the following:

- nodemon is not used to watch for file changes
- the src directory is not mounted in the docker container
- NODE_ENV=production is set (see package.json)
- It is assumed that the image interacts with an nginx proxy server and the server/api container will connect to the specified network (nginx_eshop-net). This network must be created by a separate nginx container. If an nginx server is not required, the networks: sections can be removed from the compose file.


# Sample approach for deploying to an AWS EC2 instance

The following is a sample method of deploying the server to run on an AWS EC2 instance with the Postgres database running on an AWS RDS store.

On local/build machine
1. Build image `($ docker compose -f docker-compose.production.yml build)`

1. Tag the image `($ docker tag <Image ID> <Docker Hub Username>/<Docker Hub Repository>:<Tag Name>)`

1. Push the image to docker hub `($ docker push <Docker Hub Username>/<Docker Hub Repository>)`

On EC2 instance:
1. If required (e.g. to use https or to route traffic to different servers based on domain name), configure an nginx proxy server. See example [here](https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71).

1. Pull the image `($ sudo docker pull <Docker Hub Username>/<Docker Hub Repository>:<Tag Name>)`

1. Create a .env file to configure the environment for the docker container (see sections above and .env.example in the source directory). This should include the host name and access credentials for the RDS instance as applicable.

1. Run the image. 

    `($sudo docker run -d --network nginx_eshop-net -h eshop_api --name eshop-api --env-file ./.env <image_name>)`

    In this command:
    - the image is connected to docker network nginx_eshop-net via the --network option. This assumes that an nginx server container is already running and is connected to this network. If nginx is not required, this option can be omitted.
    - the image reads the environment settings in the .env file via the --env-file option.

# Additional npm scripts

## knex

Knex operations can be executed using the following:
- npm run rollback - Rollback the database to the previous state
- npm run migrate - Migrate the database to the latest, as defined in the /db/migrations directory
- npm run seed - Initialise the database with dummy data. Note: only the products and categories tables are seeded. Tables related to users, login and cart must be created using the user interface.

## Documentation

Documentation is auto-generated by swagger-jsdoc

1. Get packages `($ npm install)`

1. Run the server, e.g. ``($ npm run start-dev)``

1. Navigate to the /docs endpoint, e.g. http://localhost:3000/docs