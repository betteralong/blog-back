'use strict';

const axios = require('axios')
const { config } = require('lin-mizar/lin/config');
const {
  LinRouter,
  NotFound,
  groupRequired,
  disableLoading
} = require('lin-mizar')
const {
  CreateProValidator
} = require('../../validators/production')
const {
  PositiveIdValidator
} = require('../../validators/common')
const { getSafeParamId } = require('../../libs/util')
const { ProductionDao } = require('../../dao/production')

const productionApi = new LinRouter({
  prefix: '/v1/production'
})

const productionDao = new ProductionDao()
const port = config.getItem('port')

productionApi.get('/', async ctx => {
  const production = await productionDao.getProductions()
  ctx.json(production)
})

productionApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx)
  const id = v.get('path.id')
  const production = await productionDao.getProduction(id)
  if(!production) {
    throw new NotFound({
      msg: '没有找到相关的作品'
    })
  }
  ctx.json(production)
})

productionApi.post('/', async ctx => {
  const v = await new CreateProValidator().validate(ctx)
  const production = await productionDao.createProduction(v)
  // 新增自动插入时光轴的功能
  axios.post(`http://localhost:${port}/v1/timeline`, {
    title: `发布作品：${production.name}`,
    image: production.image,
    content: `作品简介: ${production.summary}`,
    type: 2,
    create_time: production.create_time
  })
  ctx.success({
    msg: '新建作品成功'
  })
})

productionApi.put('/:id', async ctx => {
  const v = await new CreateProValidator().validate(ctx)
  const id = getSafeParamId(ctx)
  await productionDao.updateProduction(v, id)
  ctx.success({
    msg: '更新作品成功'
  })
})

productionApi.linDelete(
  'deleteBook',
  '/:id',
  {
    auth: '删除作品',
    module: '作品',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx)
    const id = v.get('path.id')
    await productionDao.deleteProduction(id)
    ctx.success({
      msg: '删除作品成功'
    })
  })

  module.exports = {
    productionApi, 
    [disableLoading]: false
  }