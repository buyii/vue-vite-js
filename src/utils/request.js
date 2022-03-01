import axios from 'axios'
function build (url, method, data, params = null, contentType = 'application/json') {
  const headers = { 'Content-Type': contentType }

  // token
  var token = localStorage.getItem('token')

  if (token != null) {
    headers.Authorization = 'Bearer ' + token
  }

  var options = { url: url, method: method, headers: headers }
  if (params != null) options.params = params
  if (data != null) options.data = data

  return axios(options)
}

async function callback (obj) {
  return await obj.then(function (response) {
      if(response.status===200){
        return response.data
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response)
      }
      return error.response
    })
}

export async function Get (url, params, contentType = 'application/json') {
  var obj = build(url, 'get', null, params, contentType)
  return await callback(obj)
}

export async function Post (url, data, contentType = 'application/json') {
  var obj = build(url, 'post', data, null, contentType)
  return await callback(obj)
}

export async function Put (url, data, contentType = 'application/json') {
  var obj = build(url, 'put', data, null, contentType)
  return await callback(obj)
}

export async function Delete (url, data, params, contentType = 'application/json') {
  var obj = build(url, 'delete', data, params, contentType)
  return await callback(obj)
}

export async function Patch (url, data, contentType = 'application/json') {
  var obj = build(url, 'patch', data, null, contentType)
  return await callback(obj)
}
