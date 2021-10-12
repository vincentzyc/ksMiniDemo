import CITYS from '../../assets/json/city.json';
console.log(CITYS)
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
        multiArr: []
    },
    observers: {
        'cjData.productCode': function (productCode) {
            if (productCode) this.getCityInfo(productCode)
        }
    },
    methods: {
        getCityInfo(productCode) {
            const _this = this
            ks.request({
                url: 'https://card-api.liulianglf.cn/api/product/h5_city_info',
                method: 'POST',
                data: { productCode: productCode },
                success(res) {
                    if (res.data?.data && res.data.data.length > 0) {
                        _this.setData({ cityInfo: res.data.data })
                        _this.setMultiArr(res.data.data)
                    }
                }
            })
        },
        setMultiArr() {
            const cityInfo = this.data.cityInfo
            if (this.data.ipRegion?.length > 0) {
                const province = this.data.ipRegion[0] ? this.data.ipRegion[0] : ''
                const city = this.data.ipRegion[1] ? this.data.ipRegion[1] : ''
                const area = this.data.ipRegion[2] ? this.data.ipRegion[2] : ''
                const provinces = cityInfo.map(v => v.cityName) || []
                const provinceObj = cityInfo.find(v => v.cityName === province)
                console.log(provinceObj)
                // if(provinceObj){

                // }
                // const citys = cityInfo[0].cityInfo?.map(v => v.cityName) || []
            } else {
                const provinces = cityInfo.map(v => v.cityName) || []
                const citys = cityInfo[0].cityInfo?.map(v => v.cityName) || []
                const areas = cityInfo[0].cityInfo[0]?.cityInfo?.map(v => v.cityName) || []
                this.setData({ multiArr: [provinces, citys, areas] })
                this.setData({ multiIndex: [0, 0, 0] })
            }
        },
        // initRegion() {
        //     if (this.data.ipRegion?.length > 0) {
        //         const province = this.data.ipRegion[0] ? this.data.ipRegion[0] : ''
        //         const city = this.data.ipRegion[1] ? this.data.ipRegion[1] : ''
        //         const district = this.data.ipRegion[2] ? this.data.ipRegion[2] : ''
        //         const provinceIndex = 
        //     }
        // },
        pickerMulti(e) {
            console.log('Multi', e)
        },
        pickerColumnMulti(e) {
            console.log('列为', e.detail.column, '，值为', e.detail.value);
            var data = {
                multiArray: this.data.multiArr,
                multiIndex: this.data.multiIndex
            };
            data.multiIndex[e.detail.column] = e.detail.value;
            switch (e.detail.column) {
                case 0:
                    switch (data.multiIndex[0]) {
                        case 0:
                            data.multiArray[1] = ['猫', '鼠'];
                            data.multiArray[2] = ['中华田园猫', '英短'];
                            break;
                        case 1:
                            data.multiArray[1] = ['狗', '猪'];
                            data.multiArray[2] = ['土狗', '柯基'];
                            break;
                    }
                    data.multiIndex[1] = 0;
                    data.multiIndex[2] = 0;
                    break;
                case 1:
                    switch (data.multiIndex[0]) {
                        case 0:
                            switch (data.multiIndex[1]) {
                                case 0:
                                    data.multiArray[2] = ['中华田园猫', '英短'];
                                    break;
                                case 1:
                                    data.multiArray[2] = ['田鼠', '仓鼠'];
                                    break;
                            }
                            break;
                        case 1:
                            switch (data.multiIndex[1]) {
                                case 0:
                                    data.multiArray[2] = ['田鼠', '仓鼠'];
                                    break;
                                case 1:
                                    data.multiArray[2] = ['家猪', '英格兰小乳猪'];
                                    break;
                            }
                            break;
                    }
                    data.multiIndex[2] = 0;
                    break;
            }
            this.setData({ multiArr: data.multiArray, multiIndex: data.multiIndex });
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
        },
        pickerRegion(e) {
            console.log('init region', this.data.region)
            console.log('region', e.detail.value)
            const arrRegion = e.detail.value || []
            const strRegion = arrRegion.join(' ')
            this.setData({ region: arrRegion })
            this.setData({ regions: strRegion })
        },
    },
    ready() {
        const _this = this
        ks.request({
            url: 'https://card-api.liulianglf.cn/service/onlineSaleCard/getIpRegion',
            method: 'POST',
            data: {},
            success(res) {
                const ctInfo = res.data.data || {}
                const arr = []
                if (ctInfo.province) arr.push(ctInfo.province)
                if (ctInfo.city) arr.push(ctInfo.city)
                if (ctInfo.district) arr.push(ctInfo.district)
                _this.setData({ ipRegion: arr })
            }
        })
    }
})