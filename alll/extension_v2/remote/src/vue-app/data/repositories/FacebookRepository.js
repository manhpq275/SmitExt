import { FacebookResource } from "../resources/facebook.resource";

const FacebookRepository = {
    getAdsAccountById: (params) => {
        const resource = FacebookResource.getAdsAccountById(params.id);
        const config = {
            url: resource.path,
            method: "get",
            params: params,
            withCredentials: true
        }
        return requestApiGlobal(config);

        //return axios.get(resource.path, { params, withCredentials: true });
    },
    getAdsAccountBubble: (params) => {
        const resource = FacebookResource.getAdsAccountBubble(params.id);
        const config = {
            url: resource.path,
            method: "get",
            params: params,
            withCredentials: true
        }
        return requestApiGlobal(config);
    },
}

export { FacebookRepository };