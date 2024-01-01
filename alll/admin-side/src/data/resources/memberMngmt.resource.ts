import { IResource } from "../../models/bases";
import { RESOURCE_TYPE } from "../../models/commons/enum";

export namespace MemberMngmtResource {
  export const getListMembers = (): IResource => ({
    path: "/member",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });
}
