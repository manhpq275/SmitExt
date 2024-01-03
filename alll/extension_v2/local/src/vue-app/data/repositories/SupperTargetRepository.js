import axios from 'axios';
import { SupperTargetResource } from '../resources/SupperTarget.resource';

const SupperTargetRepository = {
    getTargets: async (params) => {
        const resource = SupperTargetResource.getTargets(params.adAccountId);
        return axios.get(resource.path, { params });
    },
}

export { SupperTargetRepository };