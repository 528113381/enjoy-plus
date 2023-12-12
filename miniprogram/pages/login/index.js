let secret_code = ''
Page({
  data: {
    countDownVisible: false,
    mobile: '',
    code: ''
  },
  onLoad(options) {
    // 获取传递来的路由路径
    this.route = options.route
  },
  // 登录操作
  async login() {
    // 发送登录请求前校验手机号和验证码格式
    if (!this.validateMobile() || !this.validateCode()) return
    // 发送登录请求
    const res = await wx.http.post('/login', { mobile: this.data.mobile, code: this.data.code })
    // 验证登录请求业务是否成功
    if (res.code !== 10000) {
      wx.utils.toast(res.message || '登录请求失败')
      return
    }
    // 存储token
    getApp().token = 'Bearer ' + res.data.token
    wx.setStorage({
      key: 'token',
      data: 'Bearer ' + res.data.token
    })
    // 点击登录按钮后跳转回之前页面
    wx.navigateTo({
      url: this.route,
    })
  },
  // 校验验证码
  validateCode() {
    const pattern = /^\d{6}$/
    // 校验失败
    if (!pattern.test(this.data.code.trim())) {
      wx.utils.toast('验证码格式错误')
      return false
    }
    // 校验成功
    return true
  },
  // 校验手机号
  validateMobile() {
    const pattern = /^1[356789]\d{9}$/
    // 校验失败
    if (!pattern.test(this.data.mobile.trim())) {
      wx.utils.toast('手机号格式错误')
      return false
    }
    // 校验成功
    return true
  },
  // 获取验证码
  async getCode() {
    // 判断校验结果
    if (!this.validateMobile()) return
    // 发送获取验证码请求
    const res = await wx.http.get(`/code?mobile=${this.data.mobile.trim()}`)
    // 判断业务是否成功
    if (res.code !== 10000) {
      wx.utils.toast(res.message || '获取验证码失败')
      return
    }
    wx.utils.toast('获取验证码成功')
    secret_code = res.data.code
    // 开启等待倒计时
    this.setData({
      countDownVisible: true
    })
  },
  // 将数据放入剪切板
  setCode() {
    wx.setClipboardData({
      data: secret_code,
    })
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
})
