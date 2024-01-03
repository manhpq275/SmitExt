import moment from "moment/moment";
import store from '@vue-app/store';
import { getDisableReasonAcc } from "@vue-app/pages/helper";

export const makeAdInfoData = (adsData, currencySelected) => {
    let currencyRate = 1;
    if (currencySelected) currencyRate = store.getters.currencyRate[currencySelected.toUpperCase()][adsData.currency];
    const currencyOffset = store.getters.dynamicCurrency[adsData.currency].offset;

    let id = adsData.id || "-";
    let name = adsData.name || "-";
    let currency = " " + adsData.currency;
    let accountId = adsData.account_id;
    let status = adsData.account_status;
    let countryCode = adsData.business_country_code || "-";
    let role = adsData?.userpermissions?.data[0]?.role || "-";
    let disable_reason = getDisableReasonAcc(adsData.disable_reason);
    let created_time = moment(adsData.created_time).format("DD-MM-YYYY");
    let accountType = adsData?.owner_business ? "Business" : "Normal user";
    let next_bill_date = moment(adsData.next_bill_date).format("DD-MM-YYYY");
    let numberOfCard = adsData?.all_payment_methods?.pm_credit_card?.data?.length || 0;
    let hidden_admin = adsData?.userpermissions?.data.filter(item => !item.user).length || 0;
    let cardNumber = adsData?.all_payment_methods?.pm_credit_card?.data[0]?.display_string || "-";
    let balance = getNumberFormat((adsData.balance / currencyOffset) / Number(currencyRate)) + currency || "-";
    let total = getNumberFormat((adsData.amount_spent / currencyOffset) / Number(currencyRate)) + currency || "-";
    let limited = adsData.adtrust_dsl >= 0 ? getNumberFormat(adsData.adtrust_dsl / Number(currencyRate)) + currency : "No limit";
    let threshold_amount = getNumberFormat((adsData?.adspaymentcycle?.data[0]?.threshold_amount / currencyOffset) / Number(currencyRate)) + currency || "-";
    let timeZone = `${adsData.timezone_name} | ${adsData.timezone_offset_hours_utc > 0 ? "+" + adsData.timezone_offset_hours_utc : "-" + adsData.timezone_offset_hours_utc}`;

    return {
        id,
        role,
        name,
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
        hidden_admin,
        numberOfCard,
        created_time,
        disable_reason,
        next_bill_date,
        threshold_amount,
    }
}

function getNumberFormat(number) {
    return Intl.NumberFormat().format(number || 0);
}