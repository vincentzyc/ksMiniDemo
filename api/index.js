import { Choujin, cjBaseUrl } from "./choujin"

export const createInterface = (arr, baseUrl) => {
  let Interface = {};
  arr.forEach(v => {
    Interface[v.name] = (param, config) => {
      return new Promise((resolve, reject) => {
        Api.ksPost({
          url: baseUrl + v.url,
          data: param,
          getAllData: v.getAllData,
          getError: v.getError,
          config: config,
        }).then(res => resolve(res)).catch(error => reject(error))
      })
    }
  });
  return Interface
}

export const Api = {
  Choujin: createInterface(Choujin, cjBaseUrl),
  ksPost(config) {
    return new Promise((resolve, reject) => {
      ks.request({
        url: config.url,
        method: 'POST',
        data: config.data,
        ...config,
        success(res) {
          if (res.statusCode !== 200) {
            console.log(res);
            ks.hideLoading();
            ks.showModal({
              content: res.statusText || '网络繁忙',
              showCancel: false
            })
            return
          }
          let result = res.data;
          if (config.getAllData) return resolve(result);
          switch (result.code) {
            case "0": //  成功
              return resolve(result.data || "success");
            case "0000": //  成功
              return resolve(result.data || "success");
            default: // 失败
              if (config.getError) return reject('fail')
              ks.hideLoading();
              ks.showModal({
                content: result.message || result.msg || '服务器繁忙',
                showCancel: false
              })
          }
        },
        fail(error) {
          console.log(error);
          if (config.getError) return reject(error)
          ks.hideLoading();
          ks.showModal({
            content: '服务器繁忙',
            showCancel: false
          })
        }
      })
    })
  }
}

export default Api