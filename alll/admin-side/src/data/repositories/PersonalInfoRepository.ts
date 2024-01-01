import BaseRepository from "models/bases/BaseRepository";
import { PersonalInfoResource } from "data/resources/personcal-info.resource";

export default class PersonalInfoRepository extends BaseRepository {
  constructor() {
    super();
  }

  changePassword(password: string) {
    const resource = PersonalInfoResource.changePassword();
    return this.apiGateWay.postRequest(resource, { password });
  }
}
