
'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CreateProValidator extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '请填写作品名称')
    this.summary = new Rule('isNotEmpty', '请填写作品简介')
    this.image = new Rule('isNotEmpty', '请填写写作品封面')
    this.github = new Rule('isOptional')
    this.link = new Rule('isOptional')
  }
}

module.exports = {
  CreateProValidator
};
