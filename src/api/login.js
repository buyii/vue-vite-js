import * as request from '../utils/request'
const env = import.meta.env
const server = env.VITE_APP_SERVER_PATH
const module = 'api'

// 登录
export function login (data) {
  return request.Post(`${server}/${module}/login`, data)
}

// 注册
export function register (data) {
  return request.Post(`${server}/${module}/register`, data)
}

