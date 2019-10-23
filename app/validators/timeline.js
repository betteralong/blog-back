'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CreateTimealidator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule('isNotEmpty', '请填标题')
    this.image = new Rule('isNotEmpty', '请填图片url')
    this.content = new Rule('isNotEmpty', '请填内容')
    this.type = new Rule('isNotEmpty', '请填类型')
    this.create_time = new Rule('isNotEmpty', '请填写创建时间')
  }
}

module.exports = {
  CreateTimealidator
};
