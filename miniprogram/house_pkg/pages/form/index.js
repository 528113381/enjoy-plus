Page({
  data: {
    idcardFrontUrl: '',
    idcardBackUrl: '',
    point: '',
    building: '',
    room: '',
    name: '',
    gender: '1',
    mobile: '',
  },
  onLoad({point, room, building,id}){
    this.init(point, room, building,id)
  },
  // 判断是否为修改
  async init( point, room, building,id ){
    // 有id为修改
   if(id){
     wx.setNavigationBarTitle({
       title: '编辑房屋信息',
     })
    const res = await wx.http.get(`/room/${id}`)
    this.setData(Object.assign({},{...res.data},{gender:res.data.gender.toString()}))
   }else{
     //  没有id为添加
    this.setData({
      point,
      building,
      room,
    })
   }
  },

  // 上传图片的函数
  updateImg(e) {
    const that = this;
    // 选择媒体文件（图片或视频）
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath);
        // 上传文件至服务器
        wx.uploadFile({
          url: 'https://live-api.itheima.net/upload',
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          header: {
            Authorization: getApp().token
          },
          success(res) {
            const tmp = JSON.parse(res.data);
            console.log(res);
            console.log(tmp.data?.url);
            // 更新页面数据，显示上传的图片
            that.setData({
              [e.currentTarget.dataset.type]: tmp.data?.url
            })
          }
        })
      }
    })
  },
  // 跳转至列表页面的函数
  async goList() {
    if (!this.validateName() || !this.validateMobile() || !this.validateImg()) return
    const data = {
        point: this.data.point,
        building: this.data.building,
        room: this.data.room,
        name: this.data.name,
        gender: this.data.gender,
        mobile: this.data.mobile,
        idcardFrontUrl: this.data.idcardFrontUrl,
        idcardBackUrl: this.data.idcardBackUrl,
    }
    const postData = this.data.id ? Object.assign(data,{id:this.data.id}) : data
    const res = await wx.http({
      url: '/room',
      method: 'POST',
      data:postData
    })

    console.log('请求成功', res);
    if(res.code !== 10000) {
      wx.utils.toast('新增房屋失败')
      return
    }

    wx.navigateBack({
      delta: this.data.id ? 2 : 4
    })
    // reLaunch相当于重启的意思，既可以跳转到tabbar页面，也可以跳转到非tabbar页面。会清空所有页面栈
  },

  // 移除图片的函数
  removePicture(ev) {
    // 获取图片类型（身份证正面或反面）
    const type = ev.mark?.type;
    // 清空对应类型的图片地址
    this.setData({ [type]: '' });
  },
  validateName() {
    // 姓名必须是2-5个汉字
    const pattern = /^[\u4e00-\u9fa5]{2,5}$/
    if (!pattern.test(this.data.name)) {
      wx.utils.toast('请检查姓名')
      return false
    }
    return true
  },
  validateMobile() {
    // 姓名必须是2-5个汉字
    const pattern = /^[1][3-8][0-9]{9}$/
    if (!pattern.test(this.data.mobile)) {
      wx.utils.toast('请检查手机号')
      return false
    }
    return true
  },
  validateImg() {
    if (!this.data.idcardFrontUrl || !this.data.idcardBackUrl) {
      wx.utils.toast('身份证正反面照片必传')
      return false
    }
    return true
  }
})
