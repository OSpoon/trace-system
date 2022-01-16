/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642247825396_4609';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cors = {
    origin: '*', // 表示允许的源
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 表示允许的http请求方式
  };

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
    bodyParser: {
      jsonLimit: '5mb',
      formLimit: '5mb',
    },
    mongoose: {
      client: {
        url: 'mongodb://112.125.17.198:27017/trace_db',
        options: {
          // useMongoClient: true,
          autoReconnect: true,
          reconnectTries: Number.MAX_VALUE,
          bufferMaxEntries: 0,
        },
      },
    },
  };
};
