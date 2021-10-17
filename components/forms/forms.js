import ruleList from '../../assets/js/validate.js';
import Api from '../../api/index'

Component({
  properties: {
    cjData: {
      optionalTypes: ['Object', 'Null'],
      value: null
    }
  },
  data: {
    cityInfo: [],
    ipRegion: [],
    region: [],
    regions: '',
    multiIndex: [0, 0, 0],
    multiArr: [],
    multiText: [],
    multiStr: ''
  },
  observers: {
    'cjData.productCode': function (productCode) {
      if (productCode) this.getCityInfo(productCode)
    },
    multiText(value) {
      if (Array.isArray(value)) this.setData({ multiStr: value.join(' ') })
    }
  },
  methods: {
    getMultiText(multiIndex) {
      if (Array.isArray(this.data.multiArr) && this.data.multiArr.length === 0) return []
      const province = this.data.multiArr[0][multiIndex[0]]
      const city = multiIndex[1] == 0 || multiIndex[1] ? this.data.multiArr[1][multiIndex[1]] : ''
      const area = multiIndex[2] == 0 || multiIndex[2] ? this.data.multiArr[2][multiIndex[2]] : ''
      let multiText = []
      if (province) multiText.push(province)
      if (city) multiText.push(city)
      if (area) multiText.push(area)
      return multiText
    },
    async getCityInfo(productCode) {
      const res = await Api.Choujin.getCityInfo({ productCode: productCode })
      if (res && res.length > 0) {
        this.setData({ cityInfo: res })
        this.setMultiArr(this.data.ipRegion)
      }
    },
    setMultiArr(defaultCity) {
      if (this.data.cityInfo.length === 0) return
      const cityInfo = this.data.cityInfo
      if (Array.isArray(defaultCity) && defaultCity.length > 0) {
        const province = defaultCity[0] ? defaultCity[0] : ''
        const city = defaultCity[1] ? defaultCity[1] : ''
        const area = defaultCity[2] ? defaultCity[2] : ''
        let provinces = [], provinceIndex = 0, citys = [], cityIndex = 0, areas = [], areaIndex = 0
        for (let index1 = 0; index1 < cityInfo.length; index1++) {
          const element1 = cityInfo[index1];
          provinces.push(element1.cityName)
          if (element1.cityName === province) {
            provinceIndex = index1
          }
        }
        const provinceObj = cityInfo[provinceIndex];
        for (let index2 = 0; index2 < provinceObj.cityInfo.length; index2++) {
          const element2 = provinceObj.cityInfo[index2];
          citys.push(element2.cityName)
          if (element2.cityName === city) {
            cityIndex = index2
          }
        }
        const cityObj = provinceObj.cityInfo[cityIndex];
        for (let index3 = 0; index3 < cityObj.cityInfo.length; index3++) {
          const element3 = cityObj.cityInfo[index3];
          areas.push(element3.cityName)
          if (element3.cityName === area) {
            console.log('indexindexindex', index3);
            areaIndex = index3
          }
        }
        this.setData({
          multiArr: [provinces, citys, areas],
          multiIndex: [provinceIndex, cityIndex, areaIndex],
          multiText: [provinces[provinceIndex], citys[cityIndex], areas[areaIndex]]
        })
      } else {
        const provinces = cityInfo.map(v => v.cityName) || []
        const citys = cityInfo[0].cityInfo?.map(v => v.cityName) || []
        const areas = cityInfo[0].cityInfo[0]?.cityInfo?.map(v => v.cityName) || []
        this.setData({
          multiArr: [provinces, citys, areas],
          multiIndex: [0, 0, 0],
          multiText: [provinces[0], citys[0], areas[0]]
        })
      }
    },
    pickerColumnMulti(e) {
      switch (e.detail.column) {
        case 0:
          this.setMultiArr(this.getMultiText([e.detail.value]))
          break;
        case 1:
          this.setMultiArr(this.getMultiText([this.data.multiIndex[0], e.detail.value]))
          break;
        case 2:
          this.setMultiArr(this.getMultiText([this.data.multiIndex[0], this.data.multiIndex[1], e.detail.value]))
          break;
      }
    },
    valiDate(obj) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          if (ruleList[key]) {
            const valiRes = ruleList[key](element)
            if (valiRes !== true) return valiRes
          }
        }
      }
      return true
    },
    formatParam(params) {
      if (Array.isArray(params.selectCity) && params.selectCity.length > 0) {
        const arrCity = this.getMultiText(params.selectCity)
        params.province = arrCity[0] || "";
        params.city = arrCity[1] || "";
        params.district = arrCity[2] || "";
      }
      params.pageId = this.data.cjData.pageId
      params.pid = this.data.cjData.pid
      return params
    },
    submit(e) {
      console.log(e);
      console.log('酬金基础数据',this.data.cjData)
      const params = this.formatParam(e.detail.value)
      console.log('提交数据', params)
      const valiDateRes = this.valiDate(params);
      if (valiDateRes !== true) return ks.showToast({ title: valiDateRes, icon: 'none' })
      ks.showToast({ title: '数据格式校验通过', icon: 'none' })
    },
    openAgr1() {
      const elYunPopup = this.selectComponent('#yun-popup1')
      elYunPopup.data.show ? elYunPopup.closePopup() : elYunPopup.openPopup()
    },
    openAgr2() {
      const elYunPopup = this.selectComponent('#yun-popup2')
      elYunPopup.data.show ? elYunPopup.closePopup() : elYunPopup.openPopup()
    }
  },
  async ready() {
    const res = await Api.Choujin.getIpRegion({})
    if (res.data) {
      const ctInfo = res.data || {}
      const arr = []
      if (ctInfo.province) arr.push(ctInfo.province)
      if (ctInfo.city) arr.push(ctInfo.city)
      if (ctInfo.district) arr.push(ctInfo.district)
      this.setData({ ipRegion: arr })
      this.setMultiArr(arr)
    }
  }
})