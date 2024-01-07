import { DashboardResource } from '../resources/dashboard.resource';

const DashBoardRepository = {
    getAdsAccounts: (params) => {
        const resource = DashboardResource.getAdsAccount();
        var config = {
            url: resource.path,
            method: "get",
            params: params
        }
        return requestApiGlobal(config);
    },
    getAdsAccountById: (params) => {
        const resource = DashboardResource.getAdsAccountById(params.id);
        var config = {
            url: resource.path,
            method: "get",
            params: params
        }
        return requestApiGlobal(config);
    },
    getBMAdsAccount: (params) => {
        const resource = DashboardResource.getBMAdsAccount();
        var config = {
            url: resource.path,
            method: "get",
            params: params
        }
        return requestApiGlobal(config);
        //return axios.get(resource.path, { params });
    },
    createBMAccount: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/business_users`;
        var config = {
            url: resource,
            method: "post",
            params: params
        }
        return requestApiGlobal(config);
        //return axios.post(resource,{}, { params });
    },
    getBMUser: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/business_users`;
        var config = {
            url: resource,
            params: params
        }
        return requestApiGlobal(config);
        //return axios.get(resource, { params });
    },
    getBMPedingUser: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/pending_users`;
        var config = {
            url: resource,
            params: params
        }
        return requestApiGlobal(config);
    },
    deleteBMUser: (params,userId) => {
        const resource = `https://graph.facebook.com/v17.0/${userId}`;
        var config = {
            url: resource,
            params: params
        }
        return requestApiGlobal(config);
        //return axios.delete(resource, { params });
    },
    changeAdAccountName: (params) => {
        const resource = DashboardResource.changeAdAccountName(params.id);
        delete params.id;
        var config = {
            url: resource.path,
            method: params.method,
            params: params
        }
        return requestApiGlobal(config);
        // return axios.get(resource.path, { params });
    },
    addAdAccount: (params) => {
        const resource = DashboardResource.addAdAccount(params.id);
        delete params.id;
        // return axios.get(resource.path, { params });
        var config = {
            url: resource.path,
            method: params.method,
            params: params
        }
        return requestApiGlobal(config);
    },
    removeAdAccount: (params) => {
        const resource = DashboardResource.removeAdAccount(params.mainId, params.id);
        delete params.id;
        delete params.mainId;
        var config = {
            url: resource.path,
            method: params.method,
            params: params
        }
        return requestApiGlobal(config);
        // return axios.get(resource.path, { params });
    },
}

export { DashBoardRepository };