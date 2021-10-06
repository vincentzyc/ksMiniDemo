const types = ['default', 'primary', 'warn']
const pageObject = {
    data: {
        hadInit: true,
        // url: 'https://h5.liulianglf.cn/h5/index.html?id=2021081816082400197&pid=16800',

        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false
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
    },

    setDisabled() {
        this.setData({
            disabled: !this.data.disabled
        })
    },

    setPlain() {
        this.setData({
            plain: !this.data.plain
        })
    },

    setLoading() {
        this.setData({
            loading: !this.data.loading
        })
    },

    handleContact(e) {
        console.log(e.detail)
    },

    handleGetPhoneNumber(e) {
        console.log(e.detail)
    },

    handleGetUserInfo(e) {
        console.log(e.detail)
    },

    handleOpenSetting(e) {
        console.log(e.detail.authSetting)
    },

    handleGetUserInfo(e) {
        console.log(e.detail.userInfo)
    }
}

for (let i = 0; i < types.length; ++i) {
    (function (type) {
        pageObject[type] = function () {
            const key = type + 'Size'
            const changedData = {}
            changedData[key] =
                this.data[key] === 'default' ? 'mini' : 'default'
            this.setData(changedData)
        }
    }(types[i]))
}

Page(pageObject)