'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/dev-api/user/login', controller.user.login);
  router.get('/dev-api/user/info', controller.user.info);
  router.post('/dev-api/user/logout', controller.user.logout);
  router.get('/dev-api/user/initialize', controller.user.initialize);

  router.post('/dev-api/trace/list', controller.trace.list);
  router.post('/dev-api/trace/save', controller.trace.save);
};
