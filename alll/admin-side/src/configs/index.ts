import { IRemoteConfig } from "models/interfaces/config";

export default class Config {
  static configs: IRemoteConfig;

  static initConfig(): Promise<IRemoteConfig> {
    const endpoint =
      import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_ENDPOINT
        : import.meta.env.VITE_PROD_ENDPOINT;

    return new Promise((resolve, reject) => {
      const config: IRemoteConfig = {
        domain: `${endpoint}/api`,
        endpoint: `${endpoint}/api`,
        clientDomain: `${endpoint}/api`,
        authEndpoint: `${endpoint}/api/auth`,
      };

      Config.configs = config;

      if (config) {
        resolve(config);
      } else {
        reject();
      }
    });
  }

  static getBaseConfig = (): IRemoteConfig => {
    return Config.configs;
  };
}
