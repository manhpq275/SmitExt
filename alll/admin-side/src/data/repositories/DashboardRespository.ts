import BaseRepository from "models/bases/BaseRepository";
import { DashboardResource } from "data/resources/dashboard.resource";

export default class DashboardRepository extends BaseRepository {
  constructor() {
    super();
  }

  getListAdAccounts(ipAddress: string) {
    const resource = DashboardResource.getListAdAccounts(ipAddress);
    return this.apiGateWay.getRequest(resource);
  }

  getTableData(page: number, pageSize: number) {
    const resource = DashboardResource.getTableData();
    this.apiGateWay.params = { page: page - 1, pageSize };
    return this.apiGateWay.getRequest(resource);
  }

  getVirus() {
    const resource = DashboardResource.getVirus();
    return this.apiGateWay.getRequest(resource);
  }

  viewItem(ipID: string) {
    const resource = DashboardResource.viewItem(ipID);
    return this.apiGateWay.getRequest(resource);
  }

  removeIp(ipID: string) {
    const resource = DashboardResource.removeIp(ipID);
    return this.apiGateWay.deleteRequest(resource);
  }

  saveNote(ipId: string, content: string) {
    const resource = DashboardResource.saveNote();
    return this.apiGateWay.postRequest(resource, { ipId, content });
  }
}
