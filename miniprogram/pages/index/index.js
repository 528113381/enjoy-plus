Page({
  data: {
    list: []
  },
  onLoad() {
    this.getList()
  },
  async getList() {
    const res = await wx.http.get('/announcement')
   this.setData({
     list:res.data.data
   })
  }
})
