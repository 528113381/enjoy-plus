Page({
  data: {
    countDownVisible: false,
    mobile:''
  },
  onLoad(options){
    // 获取传递来的路由路径
    this.route = options.route
  },
  login(){
      // 点击登录按钮后跳转回之前页面
    wx.navigateTo({
      url: this.route,
    })
  },
  // 校验手机号
  validateMobile(){
    const pattern = /^1[356789]\d{9}$/
    // 校验失败

    if(!pattern.test(this.data.mobile.trim())){
      wx.utils.toast('手机号格式错误')
      return false
    }
    // 校验成功
    return true
  },
  // 获取验证码
  async getCode(){
    // 判断校验结果
    if(!this.validateMobile()) return
    // 发送获取验证码请求
    const res = await wx.http.get(`/code?mobile=${this.data.mobile.trim()}`)
    // 判断业务是否成功
    if(res.data.code !== 10000){
      wx.utils.toast(res.data.message || '获取验证码失败')
      return
    }
    wx.utils.toast('获取验证码成功')
    console.log(res.data.data.code);
    // 开启等待倒计时
    this.setData({
      countDownVisible:true
    })
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
})
