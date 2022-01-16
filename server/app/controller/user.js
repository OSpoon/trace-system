'use strict';

const BaseController = require('./base');
const KEY = require('../key');
const jwt = require('jsonwebtoken');
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
    const ret = await ctx.model.User.findOne({ username });
    if (ret.password && ret.password === md5(password)) {
      const token = jwt.sign({ username }, KEY.secretOrPrivateKey);
      const tokenRet = await ctx.model.Token.create({
        token,
      });
      if (tokenRet._id) {
        this.success({ token });
      }
    } else {
      this.error('用户名或密码错误');
    }
  }

  async info() {
    const { ctx } = this;
    const token = ctx.request.header['x-token'];
    const ret = await ctx.model.Token.findOne({ token });
    if (ret) {
      const { username } = jwt.verify(token, KEY.secretOrPrivateKey);
      const userRet = await ctx.model.User.findOne({ username });
      if (userRet) {
        this.success(userRet);
      }
    }
  }

  async logout() {
    const { ctx } = this;
    const token = ctx.request.header['x-token'];
    const ret = await ctx.model.Token.findOne({ token });
    if (ret) {
      const tokenRet = await ctx.model.Token.deleteOne({ token });
      if (tokenRet && tokenRet.ok === 1) {
        this.success('success');
      }
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
