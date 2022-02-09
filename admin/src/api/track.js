import request from '@/utils/request'

export function getPivotalList(data) {
  return request({
    url: '/track/pivotal',
    method: 'post',
    data
  })
}

export function getGeneralList(data) {
  return request({
    url: '/track/general',
    method: 'post',
    data
  })
}

export function getOtherList(data) {
  return request({
    url: '/track/other',
    method: 'post',
    data
  })
}
