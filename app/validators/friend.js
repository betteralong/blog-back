'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CreateFriendalidator extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '请填写好友名称')
    this.summary = new Rule('isNotEmpty', '请填写文章标题')
    this.image = new Rule('isNotEmpty', '请填写文章头像')
    this.bgColor = new Rule('isNotEmpty', '请填写封面颜色')
    this.link = new Rule('isNotEmpty', '请填写好友链接')
  }
}

module.exports = {
  CreateFriendalidator
};
