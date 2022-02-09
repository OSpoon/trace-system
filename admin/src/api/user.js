import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function getUsers(data) {
  return request({
    url: '/user/get',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: '/user/del',
    method: 'post',
    data: { id }
  })
}

export function enableUser(id) {
  return request({
    url: '/user/enable',
    method: 'post',
    data: { id }
  })
}

export function disableUser(id) {
  return request({
    url: '/user/disable',
    method: 'post',
    data: { id }
  })
}

export function modifyUser(data) {
  return request({
    url: '/user/modify',
    method: 'post',
    data
  })
}
