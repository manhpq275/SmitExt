import Config from "configs";
import ApiGateWayAxios from "data/ApiGateWayAxios";

export default abstract class BaseRepository {
  public apiGateWay: ApiGateWayAxios;

  constructor() {
    this.apiGateWay = new ApiGateWayAxios(Config.getBaseConfig());
  }
}
