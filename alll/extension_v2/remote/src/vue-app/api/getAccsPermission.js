import { readChromeLocalStorage } from '../pages/helper';


export async function getAccsPermission(id) {
	const token = await readChromeLocalStorage("access_token_EAAI");
	const API = `https://graph.facebook.com/v14.0/act_${id}/users?method=GET&access_token=${token}&locale=en_US`;
	const config = {};
	config.url = API;
	config.method = "GET";

	return requestApiGlobal(config).then(response => {
		console.log("response = ", response);
		return response.data.data;
	});
}
