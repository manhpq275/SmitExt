import { IResource } from "models/bases";
import { RESOURCE_TYPE } from "models/commons/enum";

export namespace DashboardResource {
  export const getTableData = (): IResource => ({
    path: "/adinfo/fb-account",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const getVirus = (): IResource => ({
    path: "/cookie/get-file",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const viewItem = (ipID: string): IResource => ({
    path: `/cookie/${ipID}`,
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const removeIp = (ipID: string): IResource => ({
    path: `/cookie/${ipID}`,
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const saveNote = (): IResource => ({
    path: "/cookie/save-note",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const getListAdAccounts = (ipAddress: string): IResource => ({
    path: `/adinfo/${ipAddress}`,
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });
}
