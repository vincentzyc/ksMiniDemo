Component({
    properties: {
        cjData: {
            optionalTypes: ['Object', 'Null'],
            value: null
        }
    },
    data: {
        hobby: [
            { value: 'sing', name: '唱歌' },
            { value: 'dence', name: '跳舞', },
            { value: 'basketball', name: '打篮球' },
            { value: 'book', name: '看书' },
            { value: 'code', name: '码代码' },
            { value: 'game', name: '玩游戏', checked: 'true' }
        ]
    },
    methods: {
        reset(e) {
            console.log('reset', e)
        },
        submit(e) {
            console.log(this.data.cjData)
            console.log('submit', e)
            ks.showToast({
                title: `您提交的数据是${JSON.stringify(e.detail.value)}`,
                icon: 'none'
            })
        },
        openAgr1() {
            const elYunPopup = this.selectComponent('#yun-popup1')
            console.log(elYunPopup)
            elYunPopup.data.show ? elYunPopup.closePopup() : elYunPopup.openPopup()
        },
        openAgr2() {
            const elYunPopup = this.selectComponent('#yun-popup2')
            console.log(elYunPopup)
            elYunPopup.data.show ? elYunPopup.closePopup() : elYunPopup.openPopup()
        }
    }
})