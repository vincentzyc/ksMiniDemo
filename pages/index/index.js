Page({
  data: {
    pid: "18495",
    cjData: null
    // hadInit: true,
    // url: 'https://h5.liulianglf.cn/h5/index.html?id=2021081816082400197&pid=16800',
  },
  goOrder() {
    const url = 'https://card.liulianglf.cn/sim/index.html#/login'
    ks.navigateTo({
      url: '/pages/iframe/iframe?url=' + encodeURIComponent(url),
    })
  },
  openService() {
    ks.showModal({
      title: "客服电话",
      content: "020-38468075",
      showCancel: false
    })
  },
  onLoad: function () {
    const _this = this
    ks.request({
      url: 'https://card-api.liulianglf.cn/service/jimPenn/page_id',
      method: 'POST',
      data: {
        pid: '18495'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data?.data) {
          res.data.data.pid = '18495'
          _this.setData({ cjData: res.data.data });
        }
      }
    })
    // const options = ks.getLaunchOptionsSync();
    // if (options.query) {
    //     const h5page = options.query.h5page || ''
    //     const callback = options.query.callback || ''
    //     let nurl = this.data.url`
    //     if (h5page) nurl = h5page
    //     if (callback) nurl = nurl.includes('?') ? nurl + '&callback=' + callback : nurl + '?callback=' + callback
    //     this.setData({ url: nurl });
    // }
    // setTimeout(() => {
    //     this.setData({ hadInit: false });
    // }, 1000)
  }
})
