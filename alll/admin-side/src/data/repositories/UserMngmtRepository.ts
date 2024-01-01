import BaseRepository from "models/bases/BaseRepository";
import { UserMngmtResource } from "data/resources/userMngmt.resource";

export default class UserMngmtRepository extends BaseRepository {
  constructor() {
    super();
  }

  getAllUsers() {
    const resource = UserMngmtResource.getListUsers();
    return this.apiGateWay.getRequest(resource);
  }

  uploadResourceFile(file: FormData) {
    const resource = UserMngmtResource.uploadResourceFile();
    return this.apiGateWay.postRequest(resource, file);
  }
}
