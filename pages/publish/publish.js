//logs.js
const util = require('../../utils/util.js')
const request = require('../../utils/request')

Page({
  data: {
    address: "点击选择，要勾选噢",
    success: false,
    idx: 0
  },
  staticData: {
    type: 'buy'
  },
  handleAddressClick () {
    console.log(666)
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },
  handleChooseLocationSucc (res) {
    console.log(res)
    this.setData({
      address: res.address
    })

    Object.assign(this.staticData,{ // ES6对象扩展
      latitude: res.latitude,
      longitude: res.longitude
    })
  },
  handleTypeChange (e) { // 类型
    this.staticData.type = e.detail.value
    // console.log(e.detail.value)
  },
  handleContactChange (e) { // 联系方式
    this.staticData.contact = e.detail.value
    // console.log(e)
  },
  handleMessageChange (e) { // 说明
    this.staticData.message = e.detail.value
    console.log(e.detail.value)
  },
  handleSubmit () {
    if (this.data.address === '点击选择，要勾选噢' || !this.data.address) { // !this.data.address 不存在
      console.log("请填写地址")
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 1500,
        image: '../../resources/erroe.png'
      })
      return
    }

    if (!this.staticData.message) {
      wx.showToast({
        title: '请填写说明信息',
        icon: 'loading',
        duration: 1500
      })
      return
    }

    if (!this.staticData.contact) {
      console.log(this.staticData.contact)
      wx.showToast({
        title: '请填写联系人信息',
        icon: 'loading',
        duration: 1500
      })
      return
    }

    var idx = wx.getStorageSync('idx') || 0
    console.log('idx', idx)
    this.setData({
      idx: idx
    },() => {
      this.requestInfo()
    })
  },
  
  requestInfo () {
    const data = Object.assign({}, this.staticData, {
      address: this.data.address,
      idx: this.data.idx,
      distinct: 'Jxiang-jc' // mysql的语法吧， 设定某个字段相同的记录只出现一条
    })
    request({
        url:'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=17603027820',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: this.getStorageInfo.bind(this, data)
    })
  },

  getStorageInfo (data, res) {// 传过来的参数在前面,res才是this的参数
    var logs = wx.getStorageSync('info') || [] // 获取本地内存里面的信息,无则为空数组
    
    
    var existed = logs.filter(item => {
      return item.address == data.address
    })

    if (existed.length > 0) { // 判断是否已经存在内存中
      wx.showToast({
        title: '请重新选择',
        icon: 'loading',
        duration: 1000
      })
      return false
    }

    logs.unshift(data)
    this.setStorageInfo(logs)
  },
  setStorageInfo (logs) { 
    try {
      wx.setStorageSync('info', logs)
      this.setData({
        success: true
      })
    } catch (e) { 
      wx.showToast({
        title: '抱歉,页面出错了',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  handleBack () {
    wx.navigateBack()
    this.setData({
      success: false
    })
  },
  onLoad () { // 进入时先把idx存入内存
    let idx = wx.getStorageSync('idx') || 0
    idx++
    wx.setStorageSync('idx', idx)
  }
})
