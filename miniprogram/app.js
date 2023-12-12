// app.js
// 方法一
import './utils/index'
// wx.utils.toast()

// 方法二
// import utils from './utils/index'
// utils.toast()

// 导入 http请求包
import './utils/http'

App({
  // 全局appjs中数据存储在内存中,访问较快
  // 全局appjs结合本地存储一起使用存储token
  token:'',
  onLaunch(){
    this.getToken()
  },
  getToken(){
    //存储在本地防止页面刷新将app上的数据清空
    wx.getStorage({
      key:'token',
      success:(res)=>{
        this.token = res.data
      }
    })
  }
})
