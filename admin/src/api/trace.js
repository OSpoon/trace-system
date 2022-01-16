import request from '@/utils/request'

export function getTraceList(data) {
  return request({
    url: '/trace/list',
    method: 'post',
    data
  })
}
