'use strict';
const md5 = require('md5');

module.exports = {
  superAdmin: {
    username: 'admin',
    password: md5('111111'),
    roles: [ 'admin' ],
    introduction: '我是系统管理员，负责分配新用户',
    avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超管',
    email: '1825203636@qq.com',
    disable: false,
  },
};
