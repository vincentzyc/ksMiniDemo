Page({
    data: {
        hadInit: true,
        // url: 'https://h5.liulianglf.cn/h5/index.html?id=2021081816082400197&pid=16800',
    },
    onLoad: function () {
        // const options = ks.getLaunchOptionsSync();
        // if (options.query) {
        //     const h5page = options.query.h5page || ''
        //     const callback = options.query.callback || ''
        //     let nurl = this.data.url
        //     if (h5page) nurl = h5page
        //     if (callback) nurl = nurl.includes('?') ? nurl + '&callback=' + callback : nurl + '?callback=' + callback
        //     this.setData({ url: nurl });
        // }
        setTimeout(() => {
            this.setData({ hadInit: false });
        }, 1000)
    }
})
