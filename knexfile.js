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
    // debug: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: 'mesh',
      user: 'boater',
      password: 'qxZVf5d9',
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
    pool: {
      min: 2,
      max: 10,
    },
  },
};
