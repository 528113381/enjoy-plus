let pid = ''
Page({
  onLoad({id}){
   this.getDetail(id)
   pid = id
  },
  async getDetail(id){
    const res = await wx.http.get(`/room/${id}`)
    console.log(res);
    this.setData({...res.data})
  },
  editHouse() {
    wx.navigateTo({
      url: `/house_pkg/pages/form/index?id=${pid}`,
    })
  },
})
