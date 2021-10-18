import Api from '../../api/index'
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
  async getPageId(){
    const params = { pid: '18495' }
    let res = await Api.Choujin.getPageId(params);
    if (res) {
      res.pid = '18495'
      this.setData({ cjData: res });
    }
  },
  onRefreshPageId: function(){
    this.getPageId()
  },
  onLoad() {
    this.getPageId()
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
