export default class Config {
    configs;

    static initConfig() {
        const endpoint =
            process.env.MODE === "development"
                ? process.env.DEV_ENDPOINT
                : process.env.PROD_ENDPOINT;

        const config = {
            domain: `${endpoint}/api`,
            endpoint: `${endpoint}/api`,
            clientDomain: `${endpoint}/api`,
            authEndpoint: `${endpoint}/api/auth`,
        };

        this.configs = config;
        return this.configs
    }

    static getBaseConfig = () => {
        return this.configs;
    };
}
