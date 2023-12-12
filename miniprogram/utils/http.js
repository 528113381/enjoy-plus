import http from 'wechat-http'

// 添加基地址
http.baseURL = "https://live-api.itheima.net"

//请求拦截器
http.intercept.request = function(options){
  const defaultOptions = {}
  // 如果应用的全局数据中存在 token，将其添加到默认选项的 Authorization 属性中
  if(getApp().token){
    defaultOptions.Authorization = getApp().token
  }
  options.header = Object.assign({},defaultOptions,options.header)
  return options
}
//响应拦截器
http.intercept.response = function(res){
  return res.data
}

// 挂载到全局对象
wx.http = http

// 普通的模块导出
// export default http