'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '<h3>欢迎使用可追溯查询数据提供服务</h3>';
  }
}

module.exports = HomeController;
