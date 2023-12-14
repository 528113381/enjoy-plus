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
  },
  // 更新昵称
  async updataNickName(e){
    if(!e.detail.value){
      wx.utils.toast('昵称不为空')
      return
    }
    const res = await wx.http.put('/userInfo',{nickName:e.detail.value})
    if(res.code !== 10000 ){
      wx.utils.toast('更新昵称请求失败')
      return
    }
    wx.utils.toast('更新成功')
    app.userInfo.nickName = e.detail.value
  },
  chooseavatarUpdate(e){
    wx.uploadFile({
      filePath: e.detail.avatarUrl,
      name: 'file',
      url: 'https://live-api.itheima.net/upload',
      header: {
        Authorization: app.token
      },
      // 上传图片，参数key不用写data，需要写formData
      formData: { type: 'avatar'},
      // 请求成功
      success: (res) => {
        const data = JSON.parse(res.data)
        console.log(data);
        // 判断业务是成功或失败
        if(data.code !== 10000) {
          wx.utils.toast(data.message || '上传图片业务失败')
          return
        }
        // 如果数据更新成功，将图片更新到当前页面上，以及appjs里面
        this.setData({
          avatar: data.data.url
        })
        app.userInfo.avatar = data.data.url
      },
      //请求失败
      fail(err) {
        console.log('请求失败', err);
      }
    })
  }
 
})