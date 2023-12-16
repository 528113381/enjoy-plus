const app = getApp()
Page({
  data:{
    avatar:'',
    nickName:''
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  onShow(){
      this.getProfile()
      if(this.data.avatar === ''){
        setTimeout(()=>{
          this.getProfile()
        },1000)
      }
  },
  // 获取用户信息
  async getProfile(){
    const res = await wx.http.get('/userInfo')
    console.log(res);
    this.setData({
      avatar:res.data?.avatar,
      nickName:res.data?.nickName
    })
    app.userInfo.avatar = res.data?.avatar
    app.userInfo.nickName = res.data?.nickName
  }
})
