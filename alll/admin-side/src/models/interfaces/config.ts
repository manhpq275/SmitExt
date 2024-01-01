export interface IRemoteConfig {
    endpoint?: string;
    accessToken?: string;
    googleApiKey?: string;
    domain: string,
    clientDomain: string,
    [key: string]: any;
}