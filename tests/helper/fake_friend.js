require('./initial');
const { db } = require('lin-mizar/lin/db');
const { Friend } = require('../../app/models/friend');

const run = async () => {
  await Friend.bulkCreate([
    {
      name: '一飞同学',
      summary: '林间有风团队成员 -- 一飞同学',
      image: 'http://www.betteralong.top/static/Avatar02.jpg',
      bgColor: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
      link: 'https://vanoneang.github.io/'
    }, 
    {
      name: 'Colorful',
      summary: '林间有风团队成员  --  Colorful',
      image: 'http://www.betteralong.top/static/Avatar01.jpg',
      bgColor: 'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)',
      link: 'https://blog.colorful3.com/'
    }
  ]);
  db.close();
};

run();
