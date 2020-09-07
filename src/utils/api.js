import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router/index'

axios.interceptors.response.use(success => {
  // eslint-disable-next-line eqeqeq
  console.log(success)
  if (success.status && success.data.status === 500) {
    Message.error({message: success.data.msg})
    return
  }
  if (success.data.msg){
    Message.success({message:success.data.msg })
  }
  return success.data
}, error => {
  // eslint-disable-next-line eqeqeq
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error({message: '服务器不存在'})
  } else if (error.response.status === 403) {
    Message.error({message: '权限不足'})
  } else if (error.response.status === 401) {
    router.replace('/')
    Message.error({message: '尚未登录，请登录'})
  } else {
    if (error.response.data.msg) {
      Message.error({message: error.response.data.msg})
    } else {
      Message.error({message: '未知错误'})
    }
  }
  return
})

let base = '';

export const postKeyValueRequest = (url,params) => {
  return axios({
    method:'post',
    url:`${base}${url}`,
    data:params,
    transformRequest:[function (data) {
      let ret='';
      for (let i in data){
        ret+=encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&'
      }
      return ret;
    }],
    headers:{
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
  })
}

export const postRequest = (url,params) => {
  return axios({
    method:'post',
    url:`${base}${url}`,
    data:params
  })
}

export const getRequest = (url,params) => {
  return axios({
    method:'get',
    url:`${base}${url}`,
    data:params,
  })
}

export const deleteRequest = (url,params) => {
  return axios({
    method:'delete',
    url:`${base}${url}`,
    data:params,
  })
}

export const putRequest = (url,params) => {
  return axios({
    method:'put',
    url:`${base}${url}`,
    data:params,
  })
}
