export default class Config {
    configs;

    static initConfig() {
        const endpoint =
            process.env.MODE === "development"
                ? process.env.DEV_ENDPOINT
                : process.env.PROD_ENDPOINT;

        return new Promise((resolve, reject) => {
            const config = {
                domain: `${endpoint}/api`,
                endpoint: `${endpoint}/api`,
                clientDomain: `${endpoint}/api`,
                authEndpoint: `${endpoint}/api/auth`,
            };

            this.configs = config;

            if (this.configs) {
                resolve(this.configs);
            } else {
                reject();
            }
        });
    }

    static getBaseConfig = () => {
        return this.configs;
    };
}
