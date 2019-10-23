require('./initial');
const { db } = require('lin-mizar/lin/db');
const { ArticleClassify } = require('../../app/models/article');

const run = async () => {
  await ArticleClassify.bulkCreate([
    {
      pid: 0,
      name: '前端'
    }, {
      pid: 0,
      name: '后端'
    }, {
      pid: 0,
      name: '运维'
    }, {
      pid: 0,
      name: '其他'
    }
  ])

  await  ArticleClassify.bulkCreate([
    {
      pid: 1,
      name: 'js',
      color: '#F9EBEA'
    },{
      pid: 1,
      name: 'js',
      color: '#D5F5E3'
    }, {
      pid: 1,
      name: 'css',
      color: '#FEF9E7'
    }, {
      pid: 1,
      name: 'vue',
      color: '#F8F9F9'
    }, {
      pid: 1,
      name: 'react',
      color: '#82E0AA'
    }, {
      pid: 1,
      name: 'canvas',
      color: '#F9E79F'
    }, {
      pid: 1,
      name: 'webpack',
      color: '#F8C471'
    }, {
      pid: 1,
      name: '单元测试',
      color: '#85C1E9'
    }, {
      pid: 2,
      name: 'node',
      color: '#F9EBEA',
    }, {
      pid: 2,
      name: 'koa',
      color: '#FEF9E7',
    }, {
      pid: 2,
      name: 'java',
      color: '#82E0AA',
    }, {
      pid: 2,
      name: 'sprintBoot',
      color: '#F8C471',
    }, {
      pid: 2,
      name: '设计模式',
      color: '#D5F5E3',
    }, {
      pid: 2,
      name: 'MyBatis',
      color: '#F8F9F9',
    }, {
      pid: 2,
      name: 'mysql',
      color: '#F9E79F',
    }, {
      pid: 2,
      name: 'RocketMQ',
      color: '#85C100',
    }, {
      pid: 2,
      name: 'redis',
      color: '#00C1E9',
    }, {
      pid: 2,
      name: 'nginx',
      color: '#178B89',
    }, {
      pid: 3,
      name: 'git',
      color: '#857768'
    }, {
      pid: 3,
      name: 'jenkins',
      color: '#FFA07A'
    }, {
      pid: 3,
      name: 'docker',
      color: '#C0C0C0'
    }, {
      pid: 3,
      name: 'Linux',
      color: '#FEF9E7'
    }, {
      pid: 4,
      name: '心情',
      color: '#FFE4B5'
    }
  ])
  db.close();
};

run();
