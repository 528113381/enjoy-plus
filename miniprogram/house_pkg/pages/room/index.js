Page({
  data: {
    point: '',
    building: '',
    room: []
  },
  // 函数参数的解构赋值
  onLoad({ point, building }) {
    this.testData(point, building)
  },
  testData(point, building) {
    // 随机生成10到30之间的楼层数
    const totalFloors = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    const roomsPerFloor = Math.floor(Math.random() * 4) + 1;

    for (let floor = 1; floor <= totalFloors; floor++) {
      for (let room = 1; room <= roomsPerFloor; room++) {
        // 使用 padStart 将楼层号和房间号都调整为两位数
        const floorNumber = floor.toString().padStart(2, '0');
        const roomNumber = room.toString().padStart(2, '0');

        const houseNumber = `${floorNumber}${roomNumber}`;
        // 将门牌号添加到数组中
        this.data.room.push(houseNumber);
      }
    }

    this.setData({
      point,
      building,
      room: this.data.room
    })
  }
})