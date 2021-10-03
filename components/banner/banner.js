Component({
    onShareAppMessage() {
        return {
            title: 'swiper',
            path: 'pages/component/swiper/index'
        }
    },

    data: {
        background: [{
            color: 'orangered',
            text: 'A'
        }, {
            color: 'orangered1',
            text: 'B'
        }, {
            color: 'orangered2',
            text: 'C'
        }],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500
    },

    methods: {
        changeIndicatorDots() {
            this.setData({
                indicatorDots: !this.data.indicatorDots
            })
        },

        changeAutoplay() {
            this.setData({
                autoplay: !this.data.autoplay
            })
        },

        intervalChange(e) {
            this.setData({
                interval: e.detail.value
            })
        },

        durationChange(e) {
            this.setData({
                duration: e.detail.value
            })
        }
    }
})