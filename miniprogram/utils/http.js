import http from 'wechat-http'

// 添加基地址
http.baseURL = "https://live-api.itheima.net"

//请求拦截器
http.intercept.request = function (options) {
  const defaultOptions = {}
  // 如果应用的全局数据中存在 token，将其添加到默认选项的 Authorization 属性中
  if (getApp().token) {
    defaultOptions.Authorization = getApp().token
  }
  // 如果有有options.header就将默认值合并覆盖
  options.header = Object.assign({}, defaultOptions, options.header)
  return options
}
//响应拦截器
http.intercept.response = async function (res) {
  // token失效,利用refreshToken去获取新token
    if (res.data.code === 401) {
    if (res.config.url.includes('/refreshToken')) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
    const app = getApp()
    const res1 = await http({
      url: '/refreshToken',
      method: 'POST',
      header: {
        Authorization: app.refreshToken
      }
    })
    console.log('刷新');
    getApp().setToken(res1.data?.token, res1.data?.refreshToken)
    const res2 =await http(Object.assign(res.config, { header: { Authorization: getApp().token } }))
    return res2.data
  }
  return res.data
}

// 挂载到全局对象
wx.http = http

// 普通的模块导出
// export default http