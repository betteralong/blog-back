'use strict';

const axios = require('axios')
const {
  LinRouter,
  NotFound,
  groupRequired,
  disableLoading
} = require('lin-mizar')
const { db } = require('lin-mizar/lin/db');
const { config } = require('lin-mizar/lin/config');
const {
  CreateAValidator,
} = require('../../validators/artcle')
const { getSafeParamId } = require('../../libs/util')
const {
  PositiveIdValidator
} = require('../../validators/common')
const { ArtcleClassDao, ArtcleDao } = require('../../dao/artcle')
const artcleApi = new LinRouter({
  prefix: '/v1/article'
})

// artcle 的dao 数据库访问层实例
const artcleDao = new ArtcleDao()
const artcleClassDao = new ArtcleClassDao()
const port = config.getItem('port')

artcleApi.post('/', async ctx => {
  const v = await new CreateAValidator().validate(ctx)
  const article = await artcleDao.createArtcle(v)
  // 新增自动插入时光轴的功能
  axios.post(`http://localhost:${port}/v1/timeline`, {
    title: `发布文章：${article.title}`,
    image: article.cover,
    content: `文章简介: ${article.brief}`,
    type: 1,
    create_time: article.create_time
  })
  ctx.success({
    msg: '新增文章成功'
  })
})

artcleApi.get('/', async ctx => {
  const artcle = await db.query('SELECT a.id, title, cover, create_time, b.name as classfyName from article a, (SELECT id, name from article_classify) b WHERE b.id = a.classfyId')
  ctx.json(artcle[0])
})

artcleApi.get('/recommend/list', async ctx => {
  const artcle = await db.query('SELECT a.id, title, cover, create_time, b.name as classfyName from article a, (SELECT id, name from article_classify) b WHERE b.id = a.classfyId')
  ctx.json(artcle[0])
})


artcleApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const artcle = await artcleDao.getArtcleByid(id)
  ctx.json(artcle)
})

artcleApi.put('/:id', async ctx => {
  const v = await new CreateAValidator().validate(ctx)
  const id = getSafeParamId(ctx);
  await artcleDao.updateArtcle(v , id)
  ctx.success({
    msg: '修改文章成功'
  })
})

artcleApi.get('/classify', async ctx => {
  const cf = await artcleClassDao.getAllClassify()
  ctx.json(cf)
})

artcleApi.get('/group/one', async ctx => {
  const cf = await db.query('select a.name, a.color,IFNULL(count,0) count from article_classify a LEFT JOIN (select count(*) count,classfyId from article GROUP BY classfyId) b on classfyId=a.id where pid>0')
  ctx.json(cf[0])
})


artcleApi.get('/group/two', async ctx => {
  const cf = await db.query('select b.name,count(a.name) as nums from article_classify a,(select id,name from article_classify) b where b.id=a.pid GROUP BY b.id')
  ctx.json(cf[0])
})


module.exports = { artcleApi, [disableLoading]: false }



