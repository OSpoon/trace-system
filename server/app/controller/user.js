'use strict';

const BaseController = require('./base');
const md5 = require('md5');

const loginUserRule = {
  username: { type: 'string' },
  password: { type: 'string' },
};

class UserController extends BaseController {
  async login() {
    const { ctx } = this;
    try {
      ctx.validate(loginUserRule);
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors);
    }
    const { username, password } = ctx.request.body;
    const { code, error, data } = await ctx.service.user.login(username, password);
    if (code === 20000 && error === 'ok' && data) {
      this.success({ token: data });
    } else {
      this.error(error);
    }
  }

  async info() {
    const { ctx } = this;
    const token = ctx.request.header['x-token'];
    const { code, error, data } = await ctx.service.user.getUserInfo(token);
    if (code === 20000 && error === 'ok' && data) {
      this.success(data);
    } else {
      this.error(error);
    }
  }

  async logout() {
    const { ctx } = this;
    const token = ctx.request.header['x-token'];
    const { code, error } = await ctx.service.user.logout(token);
    if (code === 20000 && error === 'ok') {
      this.success('success');
    } else {
      this.error('服务器暂无在线记录');
    }
  }

  async initialize() {
    const { ctx } = this;
    const ret = await ctx.model.User.create({
      username: 'admin',
      password: md5('111111'),
      roles: [ 'admin' ],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin',
    });
    if (ret._id) {
      this.message('注册成功');
    }
  }
}

module.exports = UserController;
