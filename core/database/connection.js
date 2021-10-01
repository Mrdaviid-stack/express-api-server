require("dotenv").config()
import knex from "knex"

export const DB = knex({
  client: process.env.DB_CLIENT,
  connection:
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: { enableArithAbort: true }
  },
  migrations: { stub: 'core/database/migration-template.js' }, 
})

export default DB
