import { DashboardResource } from '../resources/dashboard.resource';

const DashBoardRepository = {
    getAdsAccounts: async (params) => {
        const resource = DashboardResource.getAdsAccount();
        var config = {
            url: resource.path,
            method: "get",
            params: params
        }
        var json = await callApiNative(config);
        //total_prepay_balance
        if ('error' in json.data) {
            config.params.fields = config.params.fields.replace(/,total_prepay_balance/g, '')
            json = await callApiNative(config);
        }

        if ('error' in json.data) {
            config.params.fields = config.params.fields.replace(/,payment_method_direct_debits{address,can_verify,display_string,is_awaiting,is_pending,status}/g, '')
            json = await callApiNative(config);
        }

        if ('error' in json.data) {
            config.params.fields = config.params.fields.replace(
              /,all_payment_methods{pm_credit_card{display_string,exp_month,exp_year,is_verified}}/g,
              ''
            )
            json = await callApiNative(config);
        }
        
        return json;
    },
    getAdsAccountById: (params) => {
        const resource = DashboardResource.getAdsAccountById(params.id);
        var config = {
            url: resource.path,
            method: "get",
            params: params
        }
        return callApiNative(config);
    },
    getBMAdsAccount: (params) => {
        const resource = DashboardResource.getBMAdsAccount();
        var config = {
            url: resource.path,
            method: "get",
            params: params
        }
        return callApiNative(config);
        //return axios.get(resource.path, { params });
    },
    createBMAccount: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/business_users`;
        var config = {
            url: resource,
            method: "post",
            params: params
        }
        return callApiNative(config);
        //return axios.post(resource,{}, { params });
    },
    getBMUser: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/business_users`;
        var config = {
            url: resource,
            method: "get",
            params: params
        }
        return callApiNative(config);
        //return axios.get(resource, { params });
    },
    getBMPedingUser: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/pending_users`;
        var config = {
            url: resource,
            method: "get",
            params: params
        }
        return callApiNative(config);
    },
    deleteBMUser: (params,userId) => {
        const resource = `https://graph.facebook.com/v17.0/${userId}`;
        var config = {
            url: resource,
            method: "delete",
            params: params
        }
        return callApiNative(config);
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
        return callApiNative(config);
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
        return callApiNative(config);
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
        return callApiNative(config);
        // return axios.get(resource.path, { params });
    },
}

export { DashBoardRepository };