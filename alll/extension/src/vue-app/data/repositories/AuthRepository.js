import Config from '../../configs';
import ApiGateWay from '../_ApiGateWay';
import { AuthResource } from "../resources/auth.resource";

const AuthRepository = {
    login: (loginData) => {
        const resource = AuthResource.login();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, loginData);
    },
    signUp: (signUpData) => {
        const resource = AuthResource.signUp();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, signUpData);
    },
    verifyEmail: (verifyEmailData) => {
        const resource = AuthResource.verifyEmail();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, verifyEmailData);
    },
    sendVerifyEmail: (sendVerifyEmailData) => {
        const resource = AuthResource.sendVerifyEmail();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, sendVerifyEmailData);
    },
    checkAuthentication: () => {
        const resource = AuthResource.checkAuthentication();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.getRequest(resource);
    },
    sendFogotPasswordCode: (data) => {
        const resource = AuthResource.sendFogotPasswordCode();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, data);
    },
    verifyFogotPasswordCode: (data) => {
        const resource = AuthResource.verifyFogotPasswordCode();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, data);
    },
}

export { AuthRepository };