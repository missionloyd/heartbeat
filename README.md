# Heartbeat Database

This server-side application consists of an Express.js API, a PostgreSQL database and pgAdmin.

The API runs locally at [http://localhost:8080/](http://localhost:8080/), and it offers the following endpoints:

* `GET /tables` - Returns low-level information about the `spaces` database's tables.
* `GET /latest` - Returns most recent records in the `spaces` database's tables.
* `POST /api/records` - Returns data from the PostgreSQL database based on a query object sent within the incoming request.

## Project Setup

Add a `.env.development` file with the following environment variables to run this application:

```
# Environment Variables for the Express.js API
API_PORT=8080 # Or a different port if you already have an application running on this port.
API_CLIENT_APP_URL=http://localhost:3000 # Or whatever domain the create-react-app front-end can be accessed from.
API_DEV_MODE=true # Set this to `true` to disable TLS/SSL connections to the PostgreSQL database.

# Environment Variables for the PostgreSQL Database
PG_DB=heartbeat
PG_DB_USER=admin # Replace "postgres_user" with a unique username.
PG_DB_PASSWORD=admin # Replace "postgres_password" with a strong password. 

# Environment Variables for pgAdmin
PGADMIN_EMAIL=emailaddress@service.com # Replace "emailaddress@service.com" with your e-mail address.
PGADMIN_PASSWORD=pgadmin_password # Replace "pgadmin_password" with a strong password.
```

## Running the Application

Run the multi-container Docker application:

```shell
export DOCKER_COMPOSE_ENV_FILE=./.env.development
docker-compose --env-file $DOCKER_COMPOSE_ENV_FILE build --force-rm --no-cache && docker-compose --env-file $DOCKER_COMPOSE_ENV_FILE up --detach && docker-compose --env-file $DOCKER_COMPOSE_ENV_FILE logs --follow
```

Verify that the application is properly running by navigating to `localhost:<API_PORT>/tables` within your browser. 

# Publishing the Database
git subtree push --prefix api/ heroku master
