'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Production extends Model {
  
}

Production.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    summary: {
      type: Sequelize.STRING(256),
      allowNull: true
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    github: {
      type: Sequelize.STRING(128),
      allowNull: true
    },
    link: {
      type: Sequelize.STRING(128),
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'production',
      modelName: 'production',
      sequelize: db
    },
    InfoCrudMixin.options
  )
)

module.exports = { Production };