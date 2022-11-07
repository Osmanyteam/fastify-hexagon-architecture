import type { Knex } from "knex";
import env from "./src/shared/env";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      host: env.mysql.host,
      port: env.mysql.port,
      user: env.mysql.user,
      password: env.mysql.pwd,
      database: env.mysql.db,
    },
  },

  staging: {
    client: "mysql",
    connection: {
      host: env.mysql.host,
      port: env.mysql.port,
      user: env.mysql.user,
      password: env.mysql.pwd,
      database: env.mysql.db,
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: env.mysql.host,
      port: env.mysql.port,
      user: env.mysql.user,
      password: env.mysql.pwd,
      database: env.mysql.db,
    },
  },
};

module.exports = config;
