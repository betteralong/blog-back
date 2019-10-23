'use strict';

const {
  LinRouter,
  NotFound,
  groupRequired,
  disableLoading
} = require('lin-mizar')
const { db } = require('lin-mizar/lin/db');
const {
  CreateCfValidator
} = require('../../validators/artcle')
const {
  PositiveIdValidator
} = require('../../validators/common')
const { getSafeParamId } = require('../../libs/util')
const { ArtcleClassDao } = require('../../dao/artcle')

const artcleCfApi = new LinRouter({
  prefix: '/v1/articlecf'
})

const artcleClassDao = new ArtcleClassDao()

artcleCfApi.get('/', async ctx => {
  const cf = await db.query('select a.id as id, a.name AS name, b.name AS pName , a.pid as pid, a.color as color from article_classify a LEFT JOIN article_classify b on a.pid = b.id WHERE a.pid != 0 and ISNULL(a.delete_time)')
  ctx.json(cf[0])
})

artcleCfApi.post('/', async ctx => {
  const v = await new CreateCfValidator().validate(ctx)
  await artcleClassDao.createClassify(v)
  ctx.success({
    msg: '新建分类成功'
  })
})

artcleCfApi.get('/one', async ctx => {
  const cf = await artcleClassDao.getClassifyOne()
  ctx.json(cf)
})

artcleCfApi.get('/two', async ctx => {
  const cf = await artcleClassDao.getClassifyTwo()
  ctx.json(cf)
})

artcleCfApi.put('/:id', async ctx => {
  const v = await new CreateCfValidator().validate(ctx)
  const id = getSafeParamId(ctx);
  await artcleClassDao.updateClassify(v , id)
  ctx.success({
    msg: '修改分类成功'
  })
})

artcleCfApi.linDelete(
  'deleteArtClassify',
  '/:id',
  {
    auth: '删除文章分类',
    module: '文章',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await artcleClassDao.deleteClassfy(id);
    ctx.success({
      msg: '删除文章成功'
    })
  }
)

module.exports = { artcleCfApi, [disableLoading]: false }