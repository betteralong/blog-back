'use strict';

const { NotFound, Forbidden } = require('lin-mizar');
const { Production } = require('../models/production');
const Sequelize = require('sequelize');

class ProductionDao {
  async getProduction (id) {
    const production = await Production.findOne({
      where: {
        id,
        delete_time: null
      }
    })
    return production
  }

  async getProductions () {
    const productions = await Production.findAll({
      where: {
        delete_time: null
      }
    })
    return productions
  }

  async createProduction (v) {
    const production = new Production()
    production.name = v.get('body.name')
    production.summary = v.get('body.summary')
    production.image = v.get('body.image')
    production.github = v.get('body.github')
    production.link = v.get('body.link')
    production.save()
    return production
  }

  async updateProduction (v, id) {
    const production = await Production.findByPk(id)
    if(!production) {
      throw new NotFound({
        msg: '没有找到相关的作品'
      })
    }
    production.name = v.get('body.name')
    production.summary = v.get('body.summary')
    production.image = v.get('body.image')
    production.github = v.get('body.github')
    production.link = v.get('body.link')
    production.save()
  }

  async deleteProduction (id) {
    const production = await Production.findOne({
      where: {
        id,
        delete_time: null
      }
    })
    if(!production) {
      throw new NotFound({
        msg: '没有找到相关的作品'
      })
    }
    production.destroy()
  }
}

module.exports = { ProductionDao }