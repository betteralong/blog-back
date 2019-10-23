'use strict';

const { NotFound, Forbidden } = require('lin-mizar');
const { Article, ArticleClassify } = require('../models/article');
const Sequelize = require('sequelize');

class ArtcleClassDao {
  async createClassify(v) {
    const classify = await ArticleClassify.findOne({
      where: {
        id: v.get('body.pid'),
        delete_time: null
      }
    })
    if(!classify) {
      throw new Forbidden({
        msg: '不存此pid'
      })
    }
    const cf = new ArticleClassify()
    cf.name = v.get('body.name')
    cf.pid = v.get('body.pid')
    cf.color = v.get('body.color')
    cf.save()
  }

  async getAllClassify() {
    const cf = await ArticleClassify.findAll()
    return cf
  }

  async getClassifyOne() {
    const cf = await ArticleClassify.findAll({
      where: {
        pid: 0
      }
    })
    return cf
  }

  async getClassifyTwo() {
    const cf = await ArticleClassify.findAll({
      where: {
        pid:{
            [Sequelize.Op.not]: 0,
        }
      }
    })
    return cf
  }

  async getClassifyByPid(pid) {
    const cf = await ArticleClassify.findOne({
      pid
    })
    return cf
  }

  async updateClassify(v, id) {
    const cf = await ArticleClassify.findByPk(id)
    if(!cf) {
      throw new NotFound({
        msg: '无此分类'
      })
    }
    cf.pid = v.get('body.pid')
    cf.name = v.get('body.name')
    cf.color = v.get('body.color')
    cf.save()
  }

  async deleteClassfy(id) {
    const cf = await ArticleClassify.findOne({
      where: {
        id,
        delete_time: null
      }
    })
    if(!cf) {
      throw new NotFound({
        msg: '无此分类'
      })
    }
    cf.destroy()
  }
}

class ArtcleDao {
  async getArtcleByid(id) {
    const article = await Article.findOne({
      where: {
        id,
        delete_time: null
      }
    })
    return article
  }

  async getArtcleList() {
    const article = await Article.findAll()
    return article
  }

  async getArtcleByClassify(classifyId) {
    const article = await Article.findAll({
      where: {
        classifyId,
        delete_time: null
      }
    })
    return article
  }

  async updateArtcle(v, id) {
    const article = await Article.findByPk(id)
    if(!article) {
      throw new NotFound({
        msg: '没有找到相关的文章'
      })
    }
    article.classfyId = parseInt(v.get('body.classfyId'))
    article.title = v.get('body.title')
    article.cover = v.get('body.cover')
    article.brief = v.get('body.brief')
    article.content = v.get('body.content')
    article.save()
  }

  async createArtcle(v) {
    const article = new Article()
    article.classfyId = v.get('body.classfyId')
    article.title = v.get('body.title')
    article.cover = v.get('body.cover')
    article.brief = v.get('body.brief')
    article.content = v.get('body.content')
    article.save()
    return article
  }
}

module.exports = { ArtcleClassDao, ArtcleDao}