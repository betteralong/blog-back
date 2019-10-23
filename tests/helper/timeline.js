require('./initial');
const { db } = require('lin-mizar/lin/db');
const { Timeline } = require('../../app/models/timeline');

const run = async () => {
  await Timeline.bulkCreate([
    {
      title: '博客上线',
      content: '淡若清风博客正式上线，欢迎网友来访,有发现BUG或者好的建议可以到我的github上给个issue',
      image: 'http://www.betteralong.top/static/2019102300001.webp',
      type: 3
    }
  ])
  db.close();
};

run();
