'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Friend extends Model {
  
}

Friend.init(
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
    bgColor: {
      type: Sequelize.STRING(256),
      allowNull: true
    },
    link: {
      type: Sequelize.STRING(128),
      allowNull: false
    }
  },
  merge(
    {
      tableName: 'friend',
      modelName: 'friend',
      sequelize: db
    },
    InfoCrudMixin.options
  )
)

module.exports = { Friend };