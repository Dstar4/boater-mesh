require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/mesh.db3',
    },
    migrations: {
      directory: './src/data/migrations',
      table_name: 'knex_migrations',
    },
    seeds: {
      directory: './src/data/seeds',
    },
    useNullAsDefault: true,
    debug: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: 'mesh',
      user: process.env.USER,
      password: process.env.PASSWORD,
    },
    migrations: {
      directory: './src/data/migrations',
      table_name: 'knex_migrations',
    },
    seeds: {
      directory: './src/data/seeds',
    },
    useNullAsDefault: true,
    debug: true,
  },
};
