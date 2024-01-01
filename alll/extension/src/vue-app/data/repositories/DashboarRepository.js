import axios from "axios";
import { DashboardResource } from '../resources/dashboard.resource';

const DashBoardRepository = {
    getAdsAccounts: (params) => {
        const resource = DashboardResource.getAdsAccount();
        return axios.get(resource.path, { params });
    },
    getAdsAccountById: (params) => {
        const resource = DashboardResource.getAdsAccountById(params.id);
        return axios.get(resource.path, { params });
    },
    getBMAdsAccount: (params) => {
        const resource = DashboardResource.getBMAdsAccount();
        return axios.get(resource.path, { params });
    },
    createBMAccount: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/business_users`;
        return axios.post(resource,{}, { params });
    },
    getBMUser: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/business_users`;
        return axios.get(resource, { params });
    },
    getBMPedingUser: (params,businessId) => {
        const resource = `https://graph.facebook.com/v17.0/${businessId}/pending_users`;
        return axios.get(resource, { params });
    },
    deleteBMUser: (params,userId) => {
        const resource = `https://graph.facebook.com/v17.0/${userId}`;
        return axios.delete(resource, { params });
    },
    changeAdAccountName: (params) => {
        const resource = DashboardResource.changeAdAccountName(params.id);
        delete params.id;
        return axios.get(resource.path, { params });
    },
    addAdAccount: (params) => {
        const resource = DashboardResource.addAdAccount(params.id);
        delete params.id;
        return axios.get(resource.path, { params });
    },
    removeAdAccount: (params) => {
        const resource = DashboardResource.removeAdAccount(params.mainId, params.id);
        delete params.id;
        delete params.mainId;
        return axios.get(resource.path, { params });
    },
}

export { DashBoardRepository };