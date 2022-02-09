'use strict';

const BaseController = require('./base');
const md5 = require('md5');
const { superAdmin } = require('../common');

const loginUserRule = {
  username: { type: 'string' },
  password: { type: 'string' },
};

const newUserRule = {
  username: { type: 'string' },
  email: { type: 'string' },
  nickname: { type: 'string' },
  password: { type: 'string' },
};

/**
 * @Controller 用户管理
 */
class UserController extends BaseController {
  async login() {
    const { ctx } = this;
    try {
      ctx.validate(loginUserRule);
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors);
    }
    const { username, password } = ctx.request.body;
    const { code, error, data } = await ctx.service.user.login(
      username,
      password
    );
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

  /**
   * 通过管理员权限来新增用户
   */
  async addUser() {
    const { ctx } = this;
    try {
      ctx.validate(newUserRule);
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors);
    }
    const isSuperAdmin = await ctx.service.user.isSuperAdmin(
      ctx.request.header['x-token']
    );
    if (isSuperAdmin) {
      const { username, email, nickname, password, introduction } =
        ctx.request.body;
      const haveUser = await ctx.model.User.findOne({
        $or: [
          {
            username,
          },
          {
            email,
          },
          {
            name: nickname,
          },
        ],
      });
      console.log('[ haveUser ] >', haveUser);
      if (!haveUser) {
        const addUserRet = await ctx.model.User.create({
          username,
          password: md5(password),
          roles: [ 'editor' ],
          introduction,
          name: nickname,
          email,
        });
        if (addUserRet) {
          this.message('注册成功');
        }
      } else {
        this.error('您提交的信息已被注册，请核实后重新注册');
      }
    } else {
      this.error('您没有权限来添加新的用户');
    }
  }

  /**
   * 删除用户
   */
  async delUser() {
    const { ctx } = this;
    const isSuperAdmin = await ctx.service.user.isSuperAdmin(
      ctx.request.header['x-token']
    );
    if (isSuperAdmin) {
      const { id } = ctx.request.body;
      const res = await ctx.model.User.updateOne({ _id: id }, { delete: true });
      if (res.ok === 1 && res.nModified === 1) {
        this.success('用户已删除');
      }
    } else {
      this.error('您没有权限来操作用户');
    }
  }

  /**
   * 启用用户
   */
  async enableUser() {
    const { ctx } = this;
    const isSuperAdmin = await ctx.service.user.isSuperAdmin(
      ctx.request.header['x-token']
    );
    if (isSuperAdmin) {
      const { id } = ctx.request.body;
      const res = await ctx.model.User.updateOne(
        { _id: id },
        { disable: false }
      );
      if (res.ok === 1 && res.nModified === 1) {
        this.success('用户已启用');
      }
    } else {
      this.error('您没有权限来操作用户');
    }
  }

  /**
   * 禁用用户
   */
  async disableUser() {
    const { ctx } = this;
    const isSuperAdmin = await ctx.service.user.isSuperAdmin(
      ctx.request.header['x-token']
    );
    if (isSuperAdmin) {
      const { id } = ctx.request.body;
      const res = await ctx.model.User.updateOne(
        { _id: id },
        { disable: true }
      );
      if (res.ok === 1 && res.nModified === 1) {
        this.success('用户已禁用');
      }
    } else {
      this.error('您没有权限来操作用户');
    }
  }

  /**
   * 修改用户信息
   */
  async modifyUser() {
    const { ctx } = this;
    const isSuperAdmin = await ctx.service.user.isSuperAdmin(
      ctx.request.header['x-token']
    );
    if (isSuperAdmin) {
      const { id, email, introduction, nickname } = ctx.request.body;
      const res = await ctx.model.User.updateOne(
        { _id: id },
        { email, introduction, name: nickname }
      );
      console.log('[ res ] >', res);
      if (res.ok === 1 && res.nModified === 1) {
        this.message('用户信息已修改');
      }
    } else {
      this.error('您没有权限来操作用户');
    }
  }

  /**
   * 用户列表
   */
  async users() {
    const { ctx } = this;
    const isCheck = await ctx.service.user.checkToken(
      ctx.request.header['x-token']
    );
    if (isCheck) {
      const { username, nickname, email } = ctx.request.body;
      const request = {
        username,
        name: nickname,
        email,
        delete: false,
      };
      Object.keys(request).forEach(key => {
        if (!request[key] && key !== 'delete') {
          Reflect.deleteProperty(request, key);
        }
      });
      const users = await ctx.model.User.find(request).sort({
        createdAt: 'desc',
      });
      if (users) {
        const list = users.map(v => {
          return {
            id: v._id,
            username: v.username,
            nickname: v.name,
            email: v.email,
            createdAt: v.createdAt,
            updatedAt: v.updatedAt,
            introduction: v.introduction,
            status: v.disable,
          };
        });
        this.success({
          total: list.length,
          items: list,
        });
      }
    }
  }

  /**
   * 初始化管理员，服务发布后需要把对应路由关闭
   */
  async initialize() {
    const { ctx } = this;
    const ret = await ctx.model.User.create(superAdmin);
    if (ret._id) {
      this.message('注册成功');
    }
  }
}

module.exports = UserController;
