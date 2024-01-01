import { IResource } from "models/bases";
import { RESOURCE_TYPE } from "models/commons/enum";

export namespace UserMngmtResource {
  export const getListUsers = (): IResource => ({
    path: "/user",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const uploadResourceFile = (): IResource => ({
    path: "/user/upload-file",
    type: RESOURCE_TYPE.FORM_DATA,
  });
}
