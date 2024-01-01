export const getPersonalAccountHeaders = ($t) => {
    return [
        { key: "status", value: $t("status"), icon: 'filter-table-icon', position: 'center', width: "70px" },
        { key: "name", value: $t("name"), icon: 'person-circle', position: 'left', width: "200px", sort: 'asc' },
        { key: "balance", value: $t("balance"), icon: 'currency-exchange', position: 'left' },
        { key: "threshold_amount", value: $t("threshold_amount"), icon: 'graph-up-arrow', position: 'left' },
        { key: "adtrust_dsl", value: $t("adtrust_dsl"), icon: 'graph-up', position: 'left' },
        { key: "total", value: $t("total"), icon: 'cash-coin', position: 'left' },
        { key: "currency", value: $t("currency"), icon: 'cash', position: 'center' },
        { key: "number_of_card", value: $t("number_of_card"), icon: 'card-heading', position: 'center' },
        { key: "role", value: $t("role"), icon: 'people-fill', position: 'center' },
        { key: "next_bill_date", value: $t("next_bill_date"), icon: 'calendar-fill', position: 'center' },
        { key: "created_time", value: $t("created_time"), icon: 'calendar2-check-fill', position: 'center' },
        { key: "account_type", value: $t("account_type"), icon: 'person-circle', position: 'left' },
        { key: "last_id_card", value: $t("last_id_card"), icon: 'credit-card-2-front-fill', position: 'left' },
        { key: "disable_reason", value: $t("disable_reason"), icon: 'file-earmark-text-fill', position: 'left' },
        { key: "timezone", value: $t("timezone"), icon: 'clock-fill', position: 'left' },
        { key: "business_country_code", value: $t("business_country_code"), icon: 'map-fill', position: 'center' },
    ]
}

export const getBusinessAccountHeaders = ($t) => {
    return [
        { key: "status", value: $t('status'), icon: 'filter-square-fill', checked: true, position: 'center', width: "70px" },
        { key: "bmName", value: $t('bmName'), icon: 'person-circle', checked: true, position: 'left', sort: 'asc', width: "150px" },
        { key: "role", value: $t('role'), icon: 'person-vcard-fill', checked: true, position: 'center', width: "100px" },
        { key: "limit", value: $t('limit'), icon: 'graph-up-arrow', checked: true, position: 'left' },
        { key: "verified", value: $t('verified'), icon: 'check-square-fill', checked: true, position: 'center' },
        { key: "created", value: $t('created'), icon: 'calendar2-check-fill', checked: true, position: 'center' },
        { key: "adNumber", value: $t('adNumber'), icon: 'postcard-fill', checked: true, position: 'center' },
        { key: "accNumber", value: $t('accNumber'), icon: 'card-list', checked: true, position: 'center' },
    ]
}

export const getPersonalRequestFields = (userID) => {
    return [
        "name",
        "users",
        "balance",
        "currency",
        "account_id",
        "adtrust_dsl",
        "amount_spent",
        "created_time",
        "timezone_name",
        "account_status",
        "owner_business",
        "next_bill_date",
        "disable_reason",
        "total_prepay_balance",
        "business_country_code",
        "timezone_offset_hours_utc",
        "adspaymentcycle{threshold_amount}",
        "payment_method_paypal{email_address}",
        `userpermissions.user(${userID})`,
        "payment_method_tokens{current_balance,original_balance,time_expire,type}",
        "all_payment_methods{pm_credit_card{display_string,exp_month,exp_year,is_verified}}",
        "payment_method_direct_debits{address,can_verify,display_string,is_awaiting,is_pending,status}",
    ];
}

export const getSingleAdRequestFields = (userID) => {
    return [
        "name",
        "users",
        "balance",
        "currency",
        "account_id",
        "adtrust_dsl",
        "amount_spent",
        "created_time",
        "timezone_name",
        "account_status",
        "owner_business",
        "next_bill_date",
        "disable_reason",
        "total_prepay_balance",
        "business_country_code",
        "timezone_offset_hours_utc",
        "adspaymentcycle{threshold_amount}",
        `userpermissions.user(${userID})`,
        "all_payment_methods{pm_credit_card{display_string,exp_month,exp_year,is_verified}}",
    ];
}

export const getBusinessRequestFields = (userID) => {
    return [
        "id",
        "name",
        "created_time",
        "primary_page",
        "business_users",
        "permitted_roles",
        "ad_account_limit",
        "verification_status",
        "sharing_eligibility_status",
        "allow_page_management_in_www",
        "owned_ad_accounts.summary(1)",
        "client_ad_accounts.summary(1)",
        `userpermissions.limit(500){user{${userID}},role}`,
    ];
}

export const PERMISSION_TYPE_LIST = [
    {
        text: "Quản trị viên",
        key: "administrator",
        value: 1001,
        checked: false
    },
    {
        text: "Nhà quảng cáo",
        key: "advertiser",
        value: 1002,
        checked: false
    },
    {
        text: "Nhà phân tích",
        key: "analyst",
        value: 1003,
        checked: false
    },
]

export const currencyList = [
    { text: "Mix", symbol: "", value: "" },
    { text: "USD", symbol: '$', value: "usd" },
    { text: "EUR", symbol: '€', value: "eur" },
    { text: "THB", symbol: '฿', value: "thb" },
    { text: "VND", symbol: '₫', value: "vnd" },
]