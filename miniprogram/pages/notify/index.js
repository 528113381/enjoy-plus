Page({
  data:{
    detail:{}
  },
  onLoad(option){
    this.getDetail(option.id)
  },
  // 获取社区公告详情
  async getDetail(id){
    const res = await wx.http.get(`/announcement/${id}`)
    this.setData({
      detail:res.data
    })
  }
})