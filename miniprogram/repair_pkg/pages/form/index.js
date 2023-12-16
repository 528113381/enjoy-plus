Page({
  data: {
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    houseItem: {},
    repairList: [],
    repairItem: {},
    mobile: '',
    appointment: '', // 2022-10-01
    attachment: [
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
    ],
  },
  onLoad() {
    this.getHouse()
    this.getRepaireList()
  },
  async getHouse() {
    const res = await wx.http.get('/room')
    const houseList = res.data.map(item => {
      return { id: item.id, name: item.point}
    })
    this.setData({
      houseList
    })
  },
  houseSelect(e) {
    this.setData({
      houseItem: e.detail
    })
  },
  // 维修项目的两个
  async getRepaireList() {
    const res = await wx.http.get('/repairItem')
    this.setData({
      repairList: res.data
    })
  },
  repaireSelect(e) {
    this.setData({
      repairItem: e.detail
    })
  },
  // 时间选择的函数
  datetimeConfirm(e) {
    console.log(e.detail);
    this.setData({
      appointment: getApp().dayjs(e.detail).format('YYYY-MM-DD'),
      currentDate: e.detail,
      dateLayerVisible: false
    })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
