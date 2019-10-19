// Update with your config settings.

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
    useNullasDefault: true,
    // debug: true,
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
};
