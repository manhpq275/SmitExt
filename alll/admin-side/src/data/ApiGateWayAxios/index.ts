import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

import { IResource } from "models/bases";
import { API_METHOD } from "models/commons/enum";
import { IRemoteConfig } from "models/interfaces/config";

export default class ApiGateWayAxios {
  public _endpoint: string;
  public _timeOut: number = 100000;
  public cookies: any;
  public params: unknown;

  constructor(settings: IRemoteConfig) {
    this._endpoint = settings.endpoint || "";
  }

  callApiHandle = (
    resource: IResource,
    method: Method,
    body?: any,
    bodyType?: string
  ) => {
    const { path, type } = resource;
    const endpoint = this._endpoint;
    const url = `${endpoint}${path}`;

    const config: AxiosRequestConfig = {
      url,
      method,
      data: body,
      params: this.params,
      withCredentials: true,
      timeout: this._timeOut,
      headers: this.headerConfig(type),
    };

    return axios(config)
      .then((res) => this.handleSuccess(res.data))
      .catch((err) => this.handleError(err.response.data));
  };

  getRequest(resource: IResource) {
    return this.callApiHandle(resource, API_METHOD.GET_METHOD);
  }

  postRequest(resource: IResource, body?: any) {
    return this.callApiHandle(resource, API_METHOD.POST_METHOD, body);
  }

  putRequest(resource: IResource, body?: any) {
    return this.callApiHandle(resource, API_METHOD.PUT_METHOD, body);
  }

  patchRequest(resource: IResource, body?: any) {
    return this.callApiHandle(resource, API_METHOD.PATCH_METHOD, body);
  }

  deleteRequest(resource: IResource, body?: any) {
    return this.callApiHandle(resource, API_METHOD.DELETE_METHOD, body);
  }

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  handleError(error: any) {
    throw new Error(error.message || error);
  }

  headerConfig(type: string) {
    let headerRequest: Partial<any> = {};
    const accessToken = localStorage.getItem("jwt");
    headerRequest["Authorization"] = `Bearer ${accessToken}`;

    if (type === "file") {
      headerRequest["responseType"] = "arrayBuffer";
      headerRequest["Content-Type"] = "multipart/form-data";
    }

    return headerRequest;
  }
}
