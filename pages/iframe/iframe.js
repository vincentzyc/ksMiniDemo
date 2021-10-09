Page({
    data: {
        url: 'https://card.liulianglf.cn/sim/index.html#/login',
    },
    onLoad: function (options) {
        if (options) {
            const url = options.url || ''
            if (url) this.setData({ url: url });
        }
    }
})
