import moment from "moment/moment";
import store from '@vue-app/store';
import { getDisableReasonAcc } from "@vue-app/pages/helper";

export const makePersonalAccounts = (listAccount, searchKeyword, currencySelected) => {
    let result = listAccount;
    if (searchKeyword) result = listAccount.filter(item =>
        item.account_id.toLowerCase().includes(searchKeyword) || item.name.toLowerCase().includes(searchKeyword));

    return result.map((item, index) => {
        let currencyRate = 1;
        if (currencySelected) currencyRate = store.getters.currencyRate[currencySelected.toUpperCase()][item.currency];
        
        const currencyOffset = store.getters.dynamicCurrency[item.currency].offset;

        let id = item.id || "-";
        let name = item.name || "-";
        let currency = item.currency;
        let accountId = item.account_id;
        let status = item.account_status;
        let users = item.users.data || [];
        let countryCode = item.business_country_code || "-";
        let role = item?.userpermissions?.data[0]?.role || "-";
        let totalPrepayAmount = item.total_prepay_balance.amount || "-";
        let disable_reason = getDisableReasonAcc(item.disable_reason);
        let created_time = moment(item.created_time).format("YYYY-MM-DD");
        let accountType = item?.owner_business ? "Business" : "Normal user";
        let next_bill_date = moment(item.next_bill_date).format("YYYY-MM-DD");
        let numberOfCard = item?.all_payment_methods?.pm_credit_card?.data?.length || 0;
        let cardNumber = item?.all_payment_methods?.pm_credit_card?.data[0]?.display_string || "-";
        let balance = getNumberFormat((item.balance / currencyOffset) / Number(currencyRate)) || "-";
        let total = getNumberFormat((item.amount_spent / currencyOffset) / Number(currencyRate)) || "-";
        let limited = item.adtrust_dsl >= 0 ? getNumberFormat(item.adtrust_dsl / Number(currencyRate)) : "No limit";
        let threshold_amount = getNumberFormat((item?.adspaymentcycle?.data[0]?.threshold_amount / currencyOffset) / Number(currencyRate)) || "-";
        let timeZone = `${item.timezone_name} | ${item.timezone_offset_hours_utc > 0 ? "+" + item.timezone_offset_hours_utc : "-" + item.timezone_offset_hours_utc}`;

        return {
            id,
            role,
            name,
            users,
            total,
            status,
            limited,
            balance,
            timeZone,
            currency,
            accountId,
            cardNumber,
            accountType,
            countryCode,
            numberOfCard,
            created_time,
            disable_reason,
            next_bill_date,
            threshold_amount,
            totalPrepayAmount
        }
    });
}

export const makeBusinessAccounts = (listAccount, searchKeyword) => {
    let result = listAccount;
    if (searchKeyword) result = listAccount.filter(item =>
        item.id.toLowerCase().includes(searchKeyword) || item.name.toLowerCase().includes(searchKeyword));

    return result.map(item => {
        let id = item.id;
        let name = item.name;
        let numOfAdmin = item.business_users?.data?.length;
        let numOfAdAccount = item.owned_ad_accounts?.data?.length;
        let status = item.allow_page_management_in_www ? "Live" : "Die";
        let verification_status = item.verification_status.toUpperCase();
        let role = item.permitted_roles[item.permitted_roles.length - 1];
        let created_time = moment(item.created_time).format("YYYY-MM-DD");
        let limit = item.sharing_eligibility_status === "enabled" ? "BM350" : "BM50";

        return {
            id,
            name,
            role,
            limit,
            status,
            numOfAdmin,
            created_time,
            numOfAdAccount,
            verification_status
        }
    });
}

export const makeAdInfoData = (listData) => {
    return listData.map(item => ({
        name: item.name,
        total: item.total,
        status: item.status,
        balance: item.balance,
        currency: item.currency,
        adtrust_dsl: item.limited,
        account_id: item.accountId,
        threshold_amount: item.threshold_amount
    }))
}

export function exportTxt(tableHeader, tableData) {
    const element = document.createElement('a');
    // remove the square brackets around data; it's already an array
    let data = tableHeader.map(el => `${el.value} | `);
    tableData.forEach(item => {
        const arr = Object.values(item).map(el => `${el} | `);
        data = data.concat(arr)
    })
    const file = new Blob(data, { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'downloadTXT.txt';
    element.click();
}

export function getAccountImgLink(id) {
    return `https://graph.facebook.com/${id}/picture?access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`
}

export const handleCurrencyList = (currencyList) => {
    const newCurrencyList = [{ text: "MIX", value: "" }];
    for (const currency in currencyList) {
        if (Object.hasOwnProperty.call(currencyList, currency)) {
            const item = currencyList[currency];
            newCurrencyList.push({
                text: item.iso,
                value: item.iso.toLowerCase()
            })
        }
    }
    return newCurrencyList;
}

function getNumberFormat(number) {
    return Intl.NumberFormat().format(number || 0);
}
