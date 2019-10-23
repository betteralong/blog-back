'use strict';

let siteDomain;
switch (process.env.NODE_ENV) {
  case 'development':
    siteDomain = 'http://localhost:5000/';
    break;
  case 'production':
    siteDomain = '';
    break;
}
module.exports = {
  port: 5000,
  siteDomain,
  countDefault: 10,
  pageDefault: 0,
  apiDir: 'app/api',
  accessExp: 60 * 60, // 1h 单位秒
  // debug 模式
  debug: true,
  // refreshExp 设置refresh_token的过期时间，默认一个月
  refreshExp: 60 * 60 * 24 * 30,
  // 暂不启用插件
  pluginPath: {
    // plugin name
    // poem: {
    //   // determine a plugin work or not
    //   enable: true,
    //   // path of the plugin that relatived the workdir
    //   path: "app/plugins/poem",
    //   // other config
    //   limit: 2
    // },
    // notify: {
    //   enable: true,
    //   path: "app/plugins/notify",
    //   retry: 2000
    // }
  }
};
