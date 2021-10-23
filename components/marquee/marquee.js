Component({
  data: {
    animate: false,
    marginTop: 'margin-top:0px',
    scrollIndex: 0,
    scrollLenght: 6,
    scrollTimeId: 0,
    animateTimeId: 0,
    textList: [{
      src: '../../assets/images/header1.jpg',
      text: '李**15秒前已免费领取'
    }, {
      src: '../../assets/images/header2.jpg',
      text: '赵**22秒前已免费领取'
    }, {
      src: '../../assets/images/header3.jpg',
      text: '周**39秒前已免费领取'
    }, {
      src: '../../assets/images/header4.jpg',
      text: '张**51秒前已免费领取'
    }, {
      src: '../../assets/images/header5.jpg',
      text: '王**59秒前已免费领取'
    }, {
      src: '../../assets/images/header6.jpg',
      text: '梁**1分钟前已免费领取'
    }, {
      src: '../../assets/images/header1.jpg',
      text: '李**15秒前已免费领取'
    }]
  },
  methods: {
    scroll() {
      if (this.data.scrollIndex === 0) this.setData({ animate: true })
      console.log(this.data.scrollIndex);
      this.setData({
        scrollIndex: this.data.scrollIndex + 1,
        marginTop: `margin-top:${-44 * this.data.scrollIndex}px`
      })
      if (this.data.scrollIndex === this.data.scrollLenght) {
        this.data.animateTimeId = setTimeout(() => {
          this.setData({
            animate: false,
            marginTop: 'margin-top:0px',
            scrollIndex: 0
          })
        }, 550);
      }
    }
  },
  ready() {
    // this.data.scrollTimeId = setInterval(this.scroll, 3000);
  }
})