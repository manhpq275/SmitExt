import axios from 'axios';
import { readChromeLocalStorage } from '../pages/helper';

/*
438142079694454|fc0a7caa49b192f64f6f5a6d9643bb28 — Ads Manager Android
350685531728|62f8ce9f74b12f84c123cc23437a4a32 — Facebook Android
6628568379|c1e620fa708a1d5696fb991c1bde5662 — Facebook iPhone
- 1479723375646806|afb3e4a6d8b868314cc843c21eebc6ae — Ads Manager App for iOS
*/

export async function getFacebookAct(ACCESS_TOKEN, FACEBOOK_ID, number, link = '') {
	await getFbDTSG()
	await getRateCurrency()
	const LIST_ACCOUNT_AD = await getListIDAccountsAd(FACEBOOK_ID, ACCESS_TOKEN, number, link)
	const data = await Promise.all(LIST_ACCOUNT_AD.data.map(el => {
		const API_FB = `https://graph.facebook.com/v14.0/${el.id}?fields=
			account_id,
			owner_business,
			created_time,
			next_bill_date,
			currency,
			adtrust_dsl,
			timezone_name,
			timezone_offset_hours_utc,
			business_country_code,
			disable_reason,
			adspaymentcycle{threshold_amount},
			balance,
			is_prepay_account,
			owner,
			all_payment_methods{pm_credit_card{display_string,exp_month,exp_year,is_verified},
			payment_method_direct_debits{address,can_verify,display_string,is_awaiting,is_pending,status},
			payment_method_paypal{email_address},
			payment_method_tokens{current_balance,original_balance,time_expire,type}},
			total_prepay_balance,insights.date_preset(maximum){spend}&access_token=${ACCESS_TOKEN}`
		return axios.get(API_FB)
	}))
	const { paging, summary } = LIST_ACCOUNT_AD
	const LIST = data.map(el => {
		const ACCOUNT_AD = LIST_ACCOUNT_AD.data.filter(item => item.id == el.data.id)[0]
		return {
			...el.data,
			...ACCOUNT_AD
		}
	});
	return {
		data: [...LIST],
		paging,
		summary
	}
}

export async function getFacebookBMAcc(ACCESS_TOKEN, number = 50) {
	const LIST_BM_AD = (await getListBMsAd(ACCESS_TOKEN, number)).data.data;
	console.log("LIST_BM_AD = ", LIST_BM_AD)
	const fb_dtsg = localStorage.getItem('fb_dtsg')
	const lsd = localStorage.getItem('lsd')
	const data = await Promise.all(LIST_BM_AD.map(el => {
		const API_FB = `https://business.facebook.com/business/adaccount/limits/?business_id=${el.id}&__a=1&fb_dtsg=${fb_dtsg}&lsd=${lsd}`
		return axios.get(API_FB)
	}))
	// const dataArr = await getAllRoleAccsWithBMAcc(LIST_BM_AD[0].id, fb_dtsg, lsd);
	// console.log("dataArr = ", dataArr)
	// const adAccountLimitArr = data.map(el => JSON.parse(el.data.match(/{"adAccountLimit(.*?)}/g)[0]));
	return LIST_BM_AD.map((el, index) => {
		return {
			...el,
			// ...adAccountLimitArr[index]
		}
	});
}

export async function changePermissionForAcc(accId, uidArr, roleId) {
	const token = await readChromeLocalStorage("access_token_EAAI");
	return Promise.all(uidArr.map(async uid => {
		const API = `https://graph.facebook.com/v14.0/act_${accId}/users?method=POST&access_token=${token}&role=${roleId}&uid=${uid}&locale=en_US`
		return axios.get(API)
			.then(response => {
				return { uid, success: true, message: 'Success!' };
			})
			.catch(error => {
				console.log("error message = ", error,)
				const errObj = error.response.data.error
				return { uid, success: false, message: errObj.error_user_title || errObj.message };
			})
	}))
}

export async function removePermissionAccount(accId, uidArr) {
	const token = await readChromeLocalStorage("access_token_EAAI");
	return Promise.all(uidArr.map(async uid => {
		console.log("uidArr = ", uidArr, ", uid = ", uid)
		const API = `https://graph.facebook.com/v14.0/act_${accId}/users/${uid}?method=DELETE&access_token=${token}&locale=en_US`
		return axios.get(API)
			.then(response => {
				return { uid, success: true, message: 'Success!' };
			})
			.catch(error => {
				console.log("error message = ", error,)
				const errObj = error.response.data.error
				return { uid, success: false, message: errObj.error_user_title || errObj.message };
			})
	}))
}

export async function getAccsPermission(id) {
	const token = await readChromeLocalStorage("access_token_EAAI");
	return axios.get(`https://graph.facebook.com/v14.0/act_${id}/users?method=GET&access_token=${token}&locale=en_US`)
		.then(response => {
			console.log("response = ", response)
			return response.data.data;
		})
}

async function getListIDAccountsAd(id, token, num, link) {
	const apiFirst = `https://graph.facebook.com/v14.0/me/adaccounts?limit=${num}&fields=name,account_id,account_status,userpermissions.user(${id})%7Brole%7D&access_token=${token}&summary=1&locale=en_US`
	const API = link != '' ? link : apiFirst;
	return axios.get(API)
		.then(response => {
			if (response?.data?.data?.length > 0) {
				const data = response.data.data.map(el => {
					return {
						name: el.name,
						id: el.id,
						account_status: el.account_status,
						role: el.userpermissions.data[0].role || "-"
					}
				})
				return {
					data: [...data],
					paging: response.data.paging,
					summary: response.data.summary.total_count
				}
			}
			return [];
		})
}

export async function getListBMsAd(token, num = 50) {
	return axios.get(`https://graph.facebook.com/v14.0/me/businesses?fields=
	name,
	id,
	doc_id,
	verification_status,
	business_users,
	allow_page_management_in_www,
	sharing_eligibility_status,
	created_time,
	permitted_roles,
	client_ad_accounts.summary(1),
	owned_ad_accounts.summary(1)&limit=${num}&access_token=${token}&locale=en_US`);
}

export async function getTokenEAAI() {
	return axios
		.get(
			"https://www.facebook.com/ajax/bootloader-endpoint/?modules=AdsCanvasComposerDialog.react&__a=1"
		)
		.then(async (res) => {
			const token = res.data.match(/"access_token":"EAAI.*?"/)[0].replace(/\W/g, "").replace("access_token", "");
			const FACEBOOK_ID = await getAccountIdFacebook(token)
			chrome.storage.local.set({
				access_token_EAAI: JSON.stringify(token),
			});
			chrome.storage.local.set({
				facebook_id: FACEBOOK_ID,
			});
			return token;
		})
		.catch(function (error) {
			console.log("error = ", error);
		});
}

export async function getAccountIdFacebook(accessToken) {
	return (await axios.get(`https://graph.facebook.com/me?fields=id&access_token=${accessToken}`)).data.id
}

export async function changeAccountName(id, name) {
	const token = await readChromeLocalStorage("access_token_EAAI")
	try {
		let data = await axios.get(`https://graph.facebook.com/v14.0/act_${id}?name=${name}&method=post&access_token=${token}&locale=en_US`)
		console.log("data call API = ", data)
		return data
	}
	catch (error) {
		return error;
	}
}

export async function getFbDTSG() {
	return axios.get("https://business.facebook.com/accountquality/?landing_page=overview")
		.then(async (res) => {
			const act = [...new Set(res.data.match(/"token":"(.*?)"/g))];
			const access_token = res.data.match(/EAAE.*?"/)[0].replace(/\W/g, "");
			chrome.storage.local.set({
				access_token_EAAE: JSON.stringify(access_token),
			});
			const [fbDTSG, lsd] = act.map(el => el.split('"')[3]);
			localStorage.setItem('fb_dtsg', fbDTSG)
			localStorage.setItem('lsd', lsd)
			return { lsd, fbDTSG }
		})
}

async function getRateCurrency() {
	const CURRENCIES = ['USD', 'VND']
	const response = await Promise.all(CURRENCIES.map(el => {
		return axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${el}`)
	}))
	const currency_rate = {
		"usd_rate": response[0].data.data.rates,
		"vnd_rate": response[1].data.data.rates
	}
	localStorage.setItem("currency_rate", JSON.stringify(currency_rate))
}


export async function getAllRoleAccsWithBMAcc(bmId, fb_dtsg, lsd) {
	const tokenEAAE = await readChromeLocalStorage("access_token_EAAE")
	const API = `https://graph.facebook.com/v14.0/${bmId}/business_users?access_token=${tokenEAAE}&fields=email,+first_name,+last_name,+id,+pending_email,+role&limit=300&locale=en_US`;
	const data1 = await axios.get(API)
		.then(response => {
			console.log("getAllRoleAccsWithBMAcc = ", bmId, ": ", response.data.data)
			return response?.data?.data || [];
		})
	const dataGra = {
		__a: 1,
		dpr: 1,
		fb_dtsg: fb_dtsg,
		lsd: lsd,
		locale: 'en_US',
		doc_id: 3920367411328805,
		variables: { "entity_id": bmId, "action": null }
	};
	let form_data1 = new FormData();
	for (const key in dataGra) {
		form_data1.append(key, key == "variables" ? JSON.stringify(dataGra[key]) : dataGra[key]);
	};
	const trung = await axios({
		method: 'post',
		url: 'https://www.facebook.com/api/graphql/',
		data: form_data1
	})
		.then(response => {
			console.log("response Graph = ", response)
			return response;
		})
	const data = {
		__a: 1,
		dpr: 1,
		fb_dtsg: fb_dtsg,
		lsd: lsd,
		locale: 'en_US',
		doc_id: 5337841202999126,
		variables: { "count": 300, "cursor": "", "asset_types": ["PAGE"], "orderBy": null, "searchTerm": null, "permissions": [], "id": bmId }
	}
	let form_data = new FormData();
	for (const key in data) {
		form_data.append(key, key == "variables" ? JSON.stringify(data[key]) : data[key]);
	}

	const data2 = await axios({
		method: 'post',
		url: 'https://www.facebook.com/api/graphql/',
		data: form_data
	})
		.then(response => {
			return response.data
		})
	console.log("https://graph.facebook.com/v14.0 = ", data1)
	console.log("https://www.facebook.com/api/graphql = ", JSON.parse(data2.match(/{.*}/g)[0]))
	return 1;
}

export async function getTokenEAAB() {
	let token_EAAB = await chrome.storage.local.get(["access_token_EAAB"]).then(result => result.access_token_EAAB)
	if (token_EAAB) return token_EAAB.replace(/\W/g, "");
	const accountID = await getAdAccountIdFacebook();
	return axios.get(`https://www.facebook.com/adsmanager/manage/campaigns?act=${accountID}&nav_source=no_referrer`)
		.then(function (res2) {
			const token = res2.data.match(/EAAB.*?"/)[0].replace(/\W/g, "");
			chrome.storage.local.set({
				access_token_EAAB: JSON.stringify(token),
			});
			return token;
		})
		.catch(err => {
			console.log(err);
		});
}

async function getAdAccountIdFacebook() {
	accountFbId = axios.get("https://www.facebook.com/adsmanager/manage/campaigns")
		.then(function (res1) {
			const act = res1.data.match(/act=(.*?)&/g);
			const accountID = act[0].match(/\d+/)[0].replace(/\W/g, "");
			if (accountID) {
				chrome.storage.local.set({
					facebook_account_id: JSON.stringify(accountID),
				});
			}
			return accountID || null;
		})
	return accountFbId;
}

export async function getListSuperTarget(tokenEAAE, ID, params) {
	return axios.get(`https://adsmanager-graph.facebook.com/v15.0/act_${ID}/targetingsearch`, { params: { limit: 1000, access_token: tokenEAAE, ...params } })
		.then(function (res) {
			return res.data;
		})
		.catch(err => {
			console.log(err);
		});
}