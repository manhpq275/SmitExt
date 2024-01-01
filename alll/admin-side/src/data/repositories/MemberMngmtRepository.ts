import BaseRepository from "../../models/bases/BaseRepository";
import { MemberMngmtResource } from "../resources/memberMngmt.resource";

export default class MemberMngmtRepository extends BaseRepository {
  constructor() {
    super();
  }

  getAllMembers() {
    const resource = MemberMngmtResource.getListMembers();
    return this.apiGateWay.getRequest(resource);
  }
}
