const app = getApp()
Page({
  data: {
    avatar: '',
    nickName: ''
  },
  onLoad() {
    this.getProfile()
  },
  // 从App全局获取用户信息
  getProfile() {
    this.setData({
      avatar: app.userInfo.avatar,
      nickName: app.userInfo.nickName
    })
  }
})