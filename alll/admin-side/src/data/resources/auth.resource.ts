import { IResource } from "models/bases";
import { RESOURCE_TYPE } from "models/commons/enum";

export namespace AuthResource {
  export const login = (): IResource => ({
    path: "/auth/login",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const logout = (): IResource => ({
    path: "/auth/logout",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const getActiveLink = (): IResource => ({
    path: "/user/get-active-link",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });

  export const checkAuthentication = (): IResource => ({
    path: "/auth/check-authentication",
    type: RESOURCE_TYPE.PUBLIC_TYPE,
  });
}