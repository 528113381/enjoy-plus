Component({
  data: {
    isLogin: false
  },
  lifetimes: {
    attached() {
      const token = getApp().token
      this.setData({
        // 判断是否有token
        isLogin: !!token
      })
      if(!this.data.isLogin){
        // 通过将页面栈中保留的路径进行传递 
        const pages = getCurrentPages()
        const currentRoute = pages[pages.length -1].route
        wx.redirectTo({
          url: `/pages/login/index?route=/${currentRoute}`,
        })
      }
    }
  }
})