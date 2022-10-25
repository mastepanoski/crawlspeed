'use strict'

module.exports = Object.freeze({
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '12345',
    database: process.env.DB_NAME ?? 'localdb',
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: process.env.DB_PORT ?? 3306,
    dialect: (process.env.DB_DRIVER ?? 'mysql')
  })
  