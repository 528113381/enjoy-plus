import http from 'wechat-http'

// 添加基地址
http.baseURL = "https://live-api.itheima.net"

// 挂载到全局对象
wx.http = http

// 普通的模块导出
// export default http