'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CreateCfValidator extends LinValidator {
  constructor () {
    super();
    this.pid = new Rule('isNotEmpty', '必须传入顶级id')
    this.name = new Rule('isNotEmpty', '必须传入二级分类名称')
    this.color = new Rule('isNotEmpty', '必须传入分类背景色')
  }
}

class ArcleValidator extends LinValidator {
  constructor () {
    super();
    this.id = new Rule('isNotEmpty', '必须传入id')
  }
}

class CreateAValidator extends LinValidator {
  constructor () {
    super();
    this.classfyId = new Rule('isNotEmpty', '请填写文章分类')
    this.title = new Rule('isNotEmpty', '请填写文章标题')
    this.cover = new Rule('isNotEmpty', '请填写文章封面')
    this.brief = new Rule('isNotEmpty', '请填写文章简介')
    this.content = new Rule('isNotEmpty', '请填写文章内容')
  }
}

module.exports = {
  CreateCfValidator,
  CreateAValidator,
  ArcleValidator
};
