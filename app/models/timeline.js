'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Timeline extends Model {
  
}

Timeline.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING(512),
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    // 1 表示文章 2标是 作品 1 2 可以有对应的链接 3表示其他
    type: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    link: {
      type: Sequelize.STRING(64),
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'timeline',
      modelName: 'timeline',
      sequelize: db
    },
    InfoCrudMixin.options
  )
)

module.exports = { Timeline }