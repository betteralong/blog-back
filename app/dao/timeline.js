'use strict';

const { NotFound, Forbidden } = require('lin-mizar');
const { Timeline } = require('../models/timeline');


class TimelineDao {
  async createTimeline(v) {
    let timeline = new Timeline()
    timeline.title = v.get('body.title')
    timeline.image = v.get('body.image')
    timeline.content = v.get('body.content')
    timeline.type = v.get('body.type')
    timeline.create_time = v.get('body.create_time')
    timeline.save()
  }

  async getAllTimeline() {
    const timeline = Timeline.findAll({
      order: [['create_time', 'DESC']]
    })
    return timeline
  }

  async getTimeline(id) {
    const timeline = await Timeline.findOne({
      where: {
        id,
        delete_time: null
      }
    })
    return timeline
  }

  async createTimeline (v) {
    const timeline = new Timeline()
    timeline.title = v.get('body.title')
    timeline.image = v.get('body.image')
    timeline.content = v.get('body.content')
    timeline.type = v.get('body.type')
    timeline.save();
  }

  async updateTimeline(v, id) {
    const timeline = await Timeline.findByPk(id)
    timeline.title  = v.get('body.title');
    timeline.image = v.get('body.image');
    timeline.content = v.get('body.content');
    timeline.type = v.get('body.type');
    timeline.create_time = v.get('body.create_time');
    timeline.save()
  }

  async deleteTimeline (id) {
    const timeline = await Timeline.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    if (!timeline) {
      throw new NotFound({
        msg: '没有找到时光轴的相关信息'
      });
    }
    timeline.destroy();
  }
}

module.exports = { TimelineDao };