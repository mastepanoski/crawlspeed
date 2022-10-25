'use strict'

const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  override: true,
  path: path.resolve('.env')
})
