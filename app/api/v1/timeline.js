'use strict';

const {
  LinRouter,
  groupRequired
} = require('lin-mizar')
const {
  CreateTimealidator
} = require('../../validators/timeline')
const {
  PositiveIdValidator
} = require('../../validators/common')
const { getSafeParamId } = require('../../libs/util')
const { TimelineDao } = require('../../dao/timeline')

const timelineApi = new LinRouter({
  prefix: '/v1/timeline'
})

const timelineDao = new TimelineDao()

timelineApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx)
  const id = v.get('path.id')
  const timeline = await timelineDao.getTimeline(id)
  if (!timeline) {
    throw new NotFound({
      msg: '没有找到相关信息'
    });
  }
  ctx.json(timeline);
})

timelineApi.get('/', async ctx => {
  const timeline = await timelineDao.getAllTimeline()
  ctx.json(timeline)
})

timelineApi.post('/', async ctx => {
  const v = await new CreateTimealidator().validate(ctx)
  await timelineDao.createTimeline(v)
  ctx.success({
    msg: '新建时光轴信息成功'
  })
})

timelineApi.put('/:id', async ctx => {
  const v = await new CreateTimealidator().validate(ctx)
  const id = getSafeParamId(ctx)
  await timelineDao.updateTimeline(v, id)
  ctx.success({
    msg: '更新时光轴信息成功'
  })
})

timelineApi.linDelete(
  'deleteTimeline',
  '/:id',
  {
    auth: '删除时光轴',
    module: '时光轴',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await timelineDao.deleteTimeline(id);
    ctx.success({
      msg: '删除时光轴信息成功'
    });
  }
);

module.exports = { timelineApi }