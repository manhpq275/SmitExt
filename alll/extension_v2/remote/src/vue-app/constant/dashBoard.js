export const ACCOUNT_TABLE_HEADER = [
  { key: "status", value: "TT", icon: 'filter-square-fill', checked: true, position: 'center', sort: 'asc'},
  { key: "name", value: "Tên tài khoản", icon: 'person-circle', checked: true, position: 'left', sort: 'asc'},
  { key: "balance", value: "Số dư", icon: 'currency-exchange', checked: true, position: 'right', sort: 'asc'},
  { key: "threshold_amount", value: "Ngưỡng", icon: 'graph-up-arrow', checked: true, position: 'right', sort: 'asc'},
  { key: "adtrust_dsl", value: "Limited", icon: 'graph-up', checked: true, position: 'right', sort: 'asc'},
  { key: "total", value: "Tổng tiêu", icon: 'cash-coin', checked: true, position: 'right', sort: 'asc'},
  { key: "currency", value: "Tiền tệ", icon: 'cash', checked: true, position: 'right', sort: 'asc'},
  { key: "number_of_card", value: "SL thẻ", icon: 'card-heading', checked: true, position: 'center', sort: 'asc'},
  { key: "role", value: "Role", icon: 'people-fill', checked: true, position: 'left', sort: 'asc'},
  { key: "next_bill_date", value: "Ngày nhập hóa đơn", icon: 'calendar-fill', checked: true, position: 'center', sort: 'asc'},
  { key: "created_time", value: "Ngày tạo TK", icon: 'calendar2-check-fill', checked: true, position: 'center', sort: 'asc'},
  { key: "account_type", value: "Loại TK", icon: 'person-circle', checked: true, position: 'left', sort: 'asc'},
  { key: "account_id", value: "ID", icon: 'person-vcard-fill', checked: true, position: 'left', sort: 'asc'},
  { key: "last_id_card", value: "Đuôi thẻ", icon: 'credit-card-2-front-fill', checked: true, position: 'right', sort: 'asc'},
  { key: "remain_threshold", value: "Ngưỡng còn lại", icon: 'graph-up-arrow', checked: true, position: 'right', sort: 'asc'},
  { key: "pay_day", value: "Số ngày đến kỳ TT", icon: 'calendar-fill', checked: true, position: 'center', sort: 'asc'},
  { key: "disable_reason", value: "Lý do disable", icon: 'file-earmark-text-fill', checked: true, position: 'left', sort: 'asc'},
  { key: "timezone", value: "Timezone", icon: 'clock-fill', checked: true, position: 'left', sort: 'asc'},
  { key: "bm", value: "Tạo từ BM", icon: 'database-fill-add', checked: true, position: 'left', sort: 'asc'},
  { key: "business_country_code", value: "Quốc gia TKQC", icon: 'map-fill', checked: true, position: 'center', sort: 'asc'},
]

export const BM_TABLE_HEADER = [
  { key: "status", value: "Trạng thái", icon: 'filter-square-fill', checked: true, position: 'center', sort: 'arc'},
  { key: "bmName", value: "BM", icon: 'person-circle', checked: true, position: 'left', sort: 'arc'},
  { key: "type", value: "Loại BM", icon: 'journals', checked: true, position: 'center', sort: 'arc'},
  { key: "role", value: "Role", icon: 'person-vcard-fill', checked: true, position: 'center', sort: 'arc'},
  { key: "limit", value: "Limit", icon: 'graph-up-arrow', checked: true, position: 'left', sort: 'arc'},
  { key: "adHide", value: "Admin ẩn", icon: 'postcard', checked: true, position: 'center', sort: 'arc'},
  { key: "verified", value: "Verified", icon: 'check-square-fill', checked: true, position: 'left', sort: 'arc'},
  { key: "created", value: "Created", icon: 'calendar2-check-fill', checked: true, position: 'left', sort: 'arc'},
  { key: "id", value: "ID BM", icon: 'person-vcard-fill', checked: true, position: 'left', sort: 'arc'},
  { key: "adNumber", value: "SL Admin", icon: 'postcard-fill', checked: true, position: 'center', sort: 'arc'},
  { key: "accNumber", value: "SL account", icon: 'card-list', checked: true, position: 'center', sort: 'arc'},
  { key: "quality_bm", value: "Chất lượng BM", icon: 'check-square-fill', checked: true, position: 'left', sort: 'arc'},
]

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