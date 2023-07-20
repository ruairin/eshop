// Update with your config settings.

// Use dotenv to get environment vars from .env
const dotenv = require('dotenv');
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,

      //  for running knex from localhost
      // figure out how to use with containers
      port: process.env.DB_PORT
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds:{
      directory: './db/seeds',
    }
  }
};
