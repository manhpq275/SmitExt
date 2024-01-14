import { SupperTargetResource } from '../resources/SupperTarget.resource';

const SupperTargetRepository = {
    getTargets: async (params) => {
        const resource = SupperTargetResource.getTargets(params.adAccountId);
        return requestApiGlobal({url: resource.path,
            method: "get", params: params});
    },
}

export { SupperTargetRepository };