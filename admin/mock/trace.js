const Mock = require('mockjs')
const data = Mock.mock({
  'items|15': [
    {
      id: '@id',
      trace_id: 'TID_@integer(100000, 100999)_@integer(100000, 100999)_@integer(100000, 100999)',
      order_id: 'OID_@integer(200000, 200999)_@integer(200000, 200999)_@integer(200000, 200999)',
      'channel|1': ['渠道1', '渠道2', '渠道3', '渠道4', '渠道5'],
      login_user: 'name',
      'platform|1': ['商户平台', '运营平台', '基石塔', '开放平台', '小程序'],
      'module|1': ['订单提交', '用户注册', '密码修改', '商品支付', '大额转入', '大额转出'],
      content: '@sentence(10, 20)',
      creation_time: '@datetime'
    }
  ]
})

module.exports = [
  {
    url: '/trace/list',
    type: 'post',
    response: (config) => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
