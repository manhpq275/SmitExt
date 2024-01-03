import Config from '../../configs';
import ApiGateWay from '../_ApiGateWay';
import { PaymentResource } from '../resources/payment.resource';

const PaymentRepository = {
    getPackage: async () => {
        const resource = PaymentResource.getPackage();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.getRequest(resource);
    },
    createPayment: async (payment, packageId) => {
        const resource = PaymentResource.createPayment();
        const apiGateWay = new ApiGateWay(Config.getBaseConfig());
        return apiGateWay.postRequest(resource, { payment, packageId });
    },
}

export { PaymentRepository };