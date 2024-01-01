import { IResource } from "models/bases";
import { RESOURCE_TYPE } from "models/commons/enum";

export namespace PersonalInfoResource {
  export const changePassword = (): IResource => ({
    path: "/user/change-password",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });
}
