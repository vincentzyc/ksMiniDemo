import Api from '../../api/index'
Page({
  data: {
    pid: "18495",
    cjData: null
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
  async getPageId() {
    const params = { pid: this.data.pid }
    let res = await Api.Choujin.getPageId(params);
    if (res) {
      res.pid = this.data.pid
      this.setData({ cjData: res });
    }
  },
  onRefreshPageId: function () {
    this.getPageId()
  },
  onLoad() {
    const options = ks.getLaunchOptionsSync()
    if (options.query) {
      const pid = options.query.pid || '18495'
      this.setData({ pid: pid });
    }
    this.getPageId()
  }
})
