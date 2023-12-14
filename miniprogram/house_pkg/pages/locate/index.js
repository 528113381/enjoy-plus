// 导入腾讯地图 SDK 封装的工具 qqMap
import qqMap from '../../../utils/qqmap'
Page({
  data: {
    address: '',
    list:[]
  },
  onLoad() {
    this.getMyLocation()
  },
  // 获取当前位置信息
  async getMyLocation() {
    // 使用小程序 API 获取当前位置的经纬度信息
    const res = await wx.getLocation()
    // 进行地址解析
    this.transformAddress(res.latitude,res.longitude)
    // 获取周边
    this.getNearby(res.latitude,res.longitude)
  },
  // 选择位置信息的方法
  async chooseMyLocation() {
    const res = await wx.chooseLocation()
    console.log(res, '1111');
    this.setData({
      address: res.address
    })
    this.getNearby(res.latitude,res.longitude)
  },
  // 逆地址解析
  transformAddress(latitude,longitude) {
    // 调用腾讯地图 SDK 提供的逆地址解析方法
    qqMap.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      // 逆地址解析成功的回调函数
      success: (res) => {
        // 输出解析得到的位置信息
        this.setData({
          address: res.result.address
        })
      }
    })
  },
  //获取周边信息
  getNearby(latitude,longitude){
    qqMap.search({
      keyword: '小区',
      location: [latitude,longitude].join(','),
      success:(res)=> {
        console.log(2222, res);
        const tmp = res.data.map(item =>({
          id: item.id,
          title:item.title
        }))
        this.setData({
          list:tmp
        })
      }
    })
  } 
})