import request from '@/utils/request'

/*
  创建trace数据
*/
export function tracePost(data) {
  return request({
    url: '/trace/save',
    method: 'post',
    data
  })
}
