import axios from "axios";
import { FacebookResource } from "../resources/facebook.resource";

const FacebookRepository = {
    getAdsAccountById: (params) => {
        const resource = FacebookResource.getAdsAccountById(params.id);
        return axios.get(resource.path, { params, withCredentials: true });
    },
    getAdsAccountBubble: (params) => {
        const resource = FacebookResource.getAdsAccountBubble(params.id);
        return axios.get(resource.path, { params, withCredentials: true });
    },
}

export { FacebookRepository };