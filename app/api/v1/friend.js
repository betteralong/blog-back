'use strict';

const {
  LinRouter
} = require('lin-mizar')
const { db } = require('lin-mizar/lin/db')
const {
  CreateFriendalidator
} = require('../../validators/friend')
const {
  PositiveIdValidator
} = require('../../validators/common')
const { FriendDao } = require('../../dao/friend')

const friendApi = new LinRouter({
  prefix: '/v1/friend'
})

const friendDao = new FriendDao()

friendApi.get('/', async ctx => {
  const friend = await friendDao.getAllFriend()
  ctx.json(friend)
})

friendApi.get('/id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx)
  const friend = await friendDao.getFriend(v.get('query.id'))
  ctx.json(friend)
})

friendApi.post('/add', async ctx => {
  const v = await new CreateFriendalidator().validate(ctx)
  await friendDao.createFriend(v)
  ctx.success({
    msg: '添加好友成功'
  })
})

friendApi.post('/update', async ctx => {
  const v = await new CreateFriendalidator().validate(ctx)
  await friendDao.updateFriend(v, v.get('body.id'))
  ctx.success({
    msg: '修改好友信息成功'
  })
})

friendApi.post('/del', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx)
  await friendDao.deleteFriend(v.get('body.id'))
  ctx.success({
    msg: '删除好友成功'
  })
})

module.exports = { friendApi }