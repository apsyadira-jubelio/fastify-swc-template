// import 'dotenv/config'
import type { Knex } from 'knex'

// Update with your config settings.
const knexConfig: { [key: string]: Knex.Config } = {
  local: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      port: Number(process.env.DB_PORT),
      pool: {
        max: 10,
        min: 2,
      },
    },
  },

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      port: Number(process.env.DB_PORT),
    },
    pool: {
      max: 10,
      min: 2,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

export default knexConfig
