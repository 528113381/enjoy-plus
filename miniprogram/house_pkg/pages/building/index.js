Page({
  data: {
    size: 5,
    point: ''
  },
  onLoad(options) {
    this.testData(options.point)
  },
  // 楼号假数据
  testData(point) {
    const size = Math.floor(Math.random() * 16) + 5
    this.setData({
      point: point,
      size: size
    })
  }
})