'use strict';

const BaseController = require('./base');

const trackRule = {
  uid: { type: 'string' },
  events: { type: 'array' },
};

class TrackController extends BaseController {
  async update() {
    const { ctx } = this;
    try {
      ctx.validate(trackRule);
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors);
    }
    const { uid, timestamp, events } = ctx.request.body;
    const ret = await ctx.model.Track.findOne({ uid });
    if (!ret) {
      if (
        await ctx.model.Track.create({
          uid,
          data: [{ timestamp, events }],
        })
      ) {
        this.success({ uid });
      }
    } else {
      const res = await ctx.model.Track.updateOne(
        { uid },
        { $addToSet: { data: [{ timestamp, events }] } },
        { new: true }
      );
      if (res && res.ok === 1) {
        this.success({ uid });
      }
    }
  }

  async pivotal() {
    const { ctx } = this;
    ctx.request.body;
    this.success({
      total: 1,
      items: [
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          business_id: 'JS21CN742DEC0844',
          business_info: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
      ],
    });
  }

  async general() {
    const { ctx } = this;
    ctx.request.body;
    this.success({
      total: 1,
      items: [
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          module_name: '运营管理/结算单据信息管理',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
      ],
    });
  }

  async other() {
    const { ctx } = this;
    ctx.request.body;
    this.success({
      total: 1,
      items: [
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
        {
          uid: '1d8480b0-3ab7-4ee4-82eb-68ce73b20488',
          system_name: '商户平台',
          remark_info: '张于|654201199607125412|姓名与身份证不匹配',
          created_time: '2022-01-15T15:48:13.345Z',
          update_time: '2022-01-15T17:31:06.346Z',
          platform_info:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        },
      ],
    });
  }
}

module.exports = TrackController;
