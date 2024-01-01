import BaseRepository from "models/bases/BaseRepository";
import { AuthResource } from "data/resources/auth.resource";

export default class AuthRepository extends BaseRepository {
  constructor() {
    super();
  }

  login(param: any) {
    const resource = AuthResource.login();
    return this.apiGateWay.postRequest(resource, param);
  }

  logout() {
    const resource = AuthResource.logout();
    return this.apiGateWay.getRequest(resource);
  }

  getActiveLink(param: any) {
    const resource = AuthResource.getActiveLink();
    return this.apiGateWay.postRequest(resource, param);
  }

  checkAuthentication() {
    const resource = AuthResource.checkAuthentication();
    return this.apiGateWay.getRequest(resource);
  }
}
