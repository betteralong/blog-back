'use strict'

const { NotFound, Forbidden } = require('lin-mizar');
const { Friend } = require('../models/friend');
const Sequelize = require('sequelize');

class FriendDao {
  async getFriend(id) {
    const friend = await Friend.findOne({
      where: {
        id,
        delete_time: null
      }
    })
    return friend
  }

  async getAllFriend() {
    const friend = await Friend.findAll()
    return friend
  }

  async createFriend (v) {
    const friend = new Friend()
    friend.name = v.get('body.name')
    friend.summary = v.get('body.summary')
    friend.image = v.get('body.image')
    friend.bgColor = v.get('body.bgColor')
    friend.link = v.get('body.link')
    friend.save()
  }

  async updateFriend(v, id) {
    const friend = await Friend.findByPk(id);
    if (!friend) {
      throw new NotFound({
        msg: '没有找到相关的好友'
      });
    }
    friend.name = v.get('body.name')
    friend.summary = v.get('body.summary')
    friend.image = v.get('body.image')
    friend.bgColor = v.get('body.bgColor')
    friend.link = v.get('body.link')
    friend.save()
  }

  async deleteFriend (id) {
    const friend = await Friend.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    if (!friend) {
      throw new NotFound({
        msg: '没有找到相关的好友'
      });
    }
    friend.destroy();
  }
}


module.exports = { FriendDao };