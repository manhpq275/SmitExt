export async function readChromeLocalStorage (key) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get([key], function (result) {
			if (result[key] === undefined) {
				reject();
			} else {
				resolve(result[key].replaceAll('"',''));
			}
		});
	});
};

export function setColorStatus(status){
	let color = "rgb(122, 122, 122) !important";
	switch(status){
		case 1:
			color = "rgb(14, 236, 92) !important";
			break; 
		case 2:
		case 'Die':
			color = "rgb(255, 34, 34) !important";
			break; 
		case 3:
			color = "rgb(255, 199, 54) !important";
			break; 
		case 4:
			color = "rgb(24, 119, 242) !important";
			break; 
		case 'Live':
			color = "rgb(2, 194, 2) !important";
			break; 
		default:
			break;
	}
	return {color}
}
export function formatNumber(num,currencyChangeTo, currencyChangeFrom){
	if(!num)  return num; 
	let value = Number(num.toString().split(',').join('')).toFixed(3);
	const CURRENCY_RATE = JSON.parse(localStorage.getItem('currency_rate'))
	const RATE_ARR = CURRENCY_RATE[currencyChangeTo] || 1;
	const RATE = RATE_ARR[currencyChangeFrom] || 1;
	if(currencyChangeTo === 'usd_rate'){
		value = (num/Number(RATE)).toFixed(3);
	}else if(currencyChangeTo === 'vnd_rate'){
		value = Math.round((num/Number(RATE))); 
	}
	var parts = Number(value).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export function getDisableReasonAcc(id){
	let reason = '-';
	switch(id){
		// case 0:
		// 	reason = 'NONE';
		// 	break;
		case 1:
			reason = 'ADS_INTEGRITY_POLICY';
			break;
		case 2:
			reason = 'ADS_IP_REVIEW';
			break;
		case 3:
			reason = 'RISK_PAYMENT';
			break;
		case 4:
			reason = 'GRAY_ACCOUNT_SHUT_DOWN';
			break;
		case 5:
			reason = 'ADS_AFC_REVIEW';
			break;
		case 6:
			reason = 'BUSINESS_INTEGRITY_RAR';
			break;
		case 7:
			reason = 'PERMANENT_CLOSE';
			break;
		case 8:
			reason = 'UNUSED_RESELLER_ACCOUNT';
			break;
		case 9:
			reason = 'UNUSED_ACCOUNT';
			break;
		default:
			break;
	}
	return reason;
}

export function showIDCard(card){
	if(card.length == 0) return '-';
	const cardNumber = card[0].display_string.split('\\')[0];
	return cardNumber;
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteCookie(name) {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};