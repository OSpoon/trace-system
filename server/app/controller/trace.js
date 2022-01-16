'use strict';
const BaseController = require('./base');
const KEY = require('../key');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

const traceRule = {
  order_id: { type: 'string' },
  channel: { type: 'string' },
  login_user: { type: 'string' },
  platform: { type: 'string' },
  module: { type: 'string' },
  content: { type: 'string' },
  events: { type: 'array' },
};

class TraceController extends BaseController {
  async list() {
    const { ctx } = this;
    const token = ctx.request.header['x-token'];
    const ret = await ctx.model.Token.findOne({ token });
    if (ret) {
      const { username } = jwt.verify(token, KEY.secretOrPrivateKey);
      const {
        trace_id,
        order_id,
        channel,
        login_user,
        platform,
        module,
        creation_time,
      } = ctx.request.body;

      const request = {
        username,
        trace_id,
        order_id,
        channel,
        login_user,
        platform,
        module,
        creation_time,
      };

      Object.keys(request).forEach(key => {
        if (!request[key]) {
          Reflect.deleteProperty(request, key);
        }
      });

      const traceRet = await ctx.model.Trace.find(request).sort({
        creation_time: 'desc',
      });
      if (traceRet) {
        this.success({
          total: traceRet.length,
          items: traceRet,
        });
      }
    }
  }

  async save() {
    const { ctx } = this;
    try {
      ctx.validate(traceRule);
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors);
    }
    // const token = ctx.request.header['x-token'];
    // const ret = await ctx.model.Token.findOne({ token });
    // if (ret) {
    // const { username } = jwt.verify(token, KEY.secretOrPrivateKey);
    const {
      order_id,
      channel,
      login_user,
      platform,
      module,
      content,
      events,
      username,
    } = ctx.request.body;
    const ret = await ctx.model.Trace.create({
      order_id,
      channel,
      login_user,
      platform,
      module,
      content,
      username,
      events,
      trace_id: uuidv4(),
      creation_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    this.success({ trace_id: ret.trace_id });
    // }
  }
}

module.exports = TraceController;
