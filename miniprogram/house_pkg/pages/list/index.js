let id =''
Page({
  data: {
    dialogVisible: false,
    list: []
  },
  onShow() {
    this.getHouseList()
  },
  async getHouseList() {
    const res = await wx.http.get('/room')
    this.setData({
      list: res.data
    })
  },


  swipeClose(ev) {
    const { position, instance } = ev.detail
    id = ev.mark.id

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  goDetail(e) {
    // console.log(e, e.currentTarget.dataset.id);
    // console.log(e.mark.aaa);
    wx.navigateTo({
      url: `/house_pkg/pages/detail/index?id=${e.mark.aaa}`,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
  dialogClose(e) {
    console.log(e.detail);
  },
  async delHouse() {
    const res = await wx.http.delete(`/room/${id}`)
    if (res.code !== 10000) {
      wx.utils.toast(res.message || '删除失败')
      return
    }
    this.getHouseList()
  }
})
