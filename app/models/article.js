'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface')
const { merge } = require('lodash')
const { Sequelize, Model } = require('sequelize')
const { db } = require('lin-mizar/lin/db')

class ArticleClassify extends Model {

}

ArticleClassify.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(36),
      allowNull: false
    },
    pid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    color: {
      type: Sequelize.STRING(32),
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'article_classify',
      modelName: 'article_classify',
      sequelize: db
    },
    InfoCrudMixin.options
  )
)

class Article extends Model {

}

Article.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    classfyId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(36),
      allowNull: false
    },
    cover: {
      type: Sequelize.STRING(64)
    },
    brief: {
      type: Sequelize.STRING(200)
    },
    content: {
      type: Sequelize.STRING(4096)
    },
    recommend: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    }
    // content: {
    //   type: Sequelize.TEXT
    // }
  },
  merge(
    {
      tableName: 'article',
      modelName: 'article',
      sequelize: db
    },
    InfoCrudMixin.options
  )
)


module.exports = { ArticleClassify, Article };