import * as request from '../utils/request'
const env = import.meta.env
console.log(env)
// const server = process.env.VUE_APP_GATEWAY_PREFIX
const server = import.meta.env.VITE_APP_SERVER_PATH
// const module = 'api'

// 登录
export function login (data) {
  return request.Post(`${server}/login`, data)
}

// 注册
export function register (data) {
  return request.Post(`${server}/register`, data)
}

