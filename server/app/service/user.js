'use strict';
const Service = require('egg').Service;

const KEY = require('../key');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

class UserService extends Service {

  async login(username, password) {
    const { ctx } = this;
    const ret = await ctx.model.User.findOne({ username });
    if (ret.password && ret.password === md5(password)) {
      const token = jwt.sign({ username }, KEY.secretOrPrivateKey);
      const tokenRet = await ctx.model.Token.create({
        token,
      });
      if (tokenRet._id) {
        return { code: 20000, error: 'ok', data: token };
      }
    }
    return { code: -1, error: '登录失败，请联系管理员！' };
  }

  async getUserInfo(token) {
    const { ctx } = this;
    const _token = token;
    const ret = await ctx.model.Token.findOne({ token: _token });
    if (ret) {
      const { username } = jwt.verify(_token, KEY.secretOrPrivateKey);
      const userRet = await ctx.model.User.findOne({ username });
      if (userRet) {
        return { code: 20000, error: 'ok', data: userRet };
      }
    }
    return { code: -1, error: '获取用户信息失败，请联系管理员！' };
  }

  async logout(token) {
    const { ctx } = this;
    const _token = token;
    const ret = await ctx.model.Token.findOne({ token: _token });
    if (ret) {
      const tokenRet = await ctx.model.Token.deleteOne({ token: _token });
      if (tokenRet && tokenRet.ok === 1) {
        return { code: 20000, error: 'ok' };
      }
    }
    return { code: -1, error: '登出失败，请联系管理员！' };
  }

}
module.exports = UserService;
