Component({
    data: {
        show: false
    },

    methods: {
        openPopup() {
            this.setData({
                show: true
            })
        },
        closePopup() {
            this.setData({
                show: false
            })
        },

        handleContact(e) {
            console.log(e.detail)
        }
    }
})