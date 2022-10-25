'use strict'

const { Sequelize } = require('sequelize')
const dbConfig = require('./dbConfig')
const logger = require('./logging/logService')

const dsSetup = (debug = false) => {
  return {
    connection: new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        logging: debug ? logger.info : () => {}
      }
    )
  }
}

module.exports = dsSetup
