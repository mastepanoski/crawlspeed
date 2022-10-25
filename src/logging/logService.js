'use strict'

const pino = require('pino')
const path = require('path')

const dest = pino.destination(path.resolve(__dirname, '..', '..', 'logs', 'info.log'))

const logger = pino(
  {
    // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    redact: ['req.headers.authorization']
  },
  dest
)

module.exports = Object.freeze({
  info: (msg) => logger.info(msg),
  warn: (msg) => logger.warn(msg),
  error: (msg) => logger.error(msg),
  final: (err) => {
    console.error(err)
  }
})
