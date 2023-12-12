const utils = {
  toast(title = "数据加载失败..."){
    wx.showToast({
      title,
      icon:'none',
      duration:2000,
      mask:true
    })
  }
}
// 将 'utils' 对象挂载到 'wx' 对象上
wx.utils = utils
//es5导出
// export default utils

