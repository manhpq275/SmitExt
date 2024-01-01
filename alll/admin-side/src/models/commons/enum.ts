export enum BODY_TYPE {
  FILE = "multipart/form-data",
  JSON = "application/json",
}

export enum API_METHOD {
  GET_METHOD = "get",
  POST_METHOD = "post",
  PUT_METHOD = "put",
  PATCH_METHOD = "patch",
  DELETE_METHOD = "delete",
}

export enum RESOURCE_TYPE {
  ADMIN_TYPE = "admin",
  PUBLIC_TYPE = "public",
  FILE = "file",
  FORM_DATA = "form data",
}

export enum ROLES {
  ALL = "all",
  ADMIN = "admin",
  MEMBER = "member",
}

export enum PERMISSION {
  ALL = "all",
  ADMIN = "admin",
  MEMBER = "member",
  SYSTEM_ADMIN = "system-admin",
}
