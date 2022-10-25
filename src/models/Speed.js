'use strict'

const { DataTypes } = require('sequelize')

const TABLE_NAME = 'speeds'
const TABLE_ATTRIBUTES = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  download: {
    type: DataTypes.DECIMAL(10, 2)
  },
  upload: {
    type: DataTypes.DECIMAL(10, 2)
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}

const createModel = (connection) => {
  return connection.define(TABLE_NAME, TABLE_ATTRIBUTES,
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
}

module.exports = {
  TABLE_NAME,
  TABLE_ATTRIBUTES,
  createModel
}
