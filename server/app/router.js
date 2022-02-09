'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

// 配置统一的请求前缀，方便扩展网关服务做统一调度
const GATEWAY_PREFIX = '/dev-api';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 旧版
  router.group(
    { name: 'track', prefix: `${GATEWAY_PREFIX}/trace` },
    router => {
      const { list, save } = controller.trace;
      router.post('/list', list);
      router.post('/save', save);
    }
  );

  // 回溯数据管理
  router.group(
    { name: 'track', prefix: `${GATEWAY_PREFIX}/track` },
    router => {
      const { pivotal, general, other, update } = controller.track;
      // 获取关键可回溯列表数据
      router.post('/pivotal', pivotal);
      // 获取普通可回溯列表数据
      router.post('/general', general);
      // 获取其他可回溯列表数据
      router.post('/other', other);
      router.post('/update', update);
    }
  );

  // 用户数据管理
  router.group({ name: 'user', prefix: `${GATEWAY_PREFIX}/user` }, router => {
    const {
      login,
      info,
      logout,
      addUser,
      users,
      delUser,
      enableUser,
      disableUser,
      initialize,
      modifyUser,
    } = controller.user;
    // 用户登录
    router.post('/login', login);
    // 当前用户信息获取
    router.get('/info', info);
    // 用户登出
    router.post('/logout', logout);
    // 新增用户
    router.post('/add', addUser);
    // 修改用户
    router.post('/modify', modifyUser);
    // 用户列表获取
    router.post('/get', users);
    // 删除用户
    router.post('/del', delUser);
    // 启用用户
    router.post('/enable', enableUser);
    // 禁用用户
    router.post('/disable', disableUser);
    // 初始化管理员信息
    router.get('/initialize', initialize);
  });
};
