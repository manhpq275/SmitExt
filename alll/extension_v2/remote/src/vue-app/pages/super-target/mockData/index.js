export const getSuperTargetTableHeaders = ($t) => {
    return [
        { key: "no", value: $t('label.no'), position: 'center', width: "20px" },
        { key: "interest", value: $t('label.interest'), position: 'left', width: "150px" },
        { key: "audianceSize", value: $t('label.audiance-size'), position: 'center', width: "80px" },
        { key: "action", value: $t('label.action'), position: 'center' },
    ]
}

export const mockDataTable = [
    {
        "id": "6002986908368",
        "name": "Ngôi nhà (bất động sản)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Ngôi nhà (bất động sản)"
        ],
        "audience_size": 682136510,
        "audience_size_lower_bound": 580048052,
        "audience_size_upper_bound": 682136510
    },
    {
        "id": "6003436950375",
        "name": "Nhà hàng (ăn uống)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Ẩm thực",
            "Nhà hàng (ăn uống)"
        ],
        "audience_size": 859042310,
        "audience_size_lower_bound": 730478154,
        "audience_size_upper_bound": 859042310
    },
    {
        "id": "6003012400881",
        "name": "Nhà máy (sản xuất)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Nhà máy (sản xuất)"
        ],
        "audience_size": 244204950,
        "audience_size_lower_bound": 207657270,
        "audience_size_upper_bound": 244204950
    },
    {
        "id": "6003253278111",
        "name": "Nhà kho (ngành)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Nhà kho (ngành)"
        ],
        "audience_size": 133932990,
        "audience_size_lower_bound": 113888596,
        "audience_size_upper_bound": 133932990
    },
    {
        "id": "6003287531876",
        "name": "Mẫu giáo (giáo dục tiểu học và trung học phổ thông)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Mẫu giáo (giáo dục tiểu học và trung học phổ thông)"
        ],
        "audience_size": 155815650,
        "audience_size_lower_bound": 132496301,
        "audience_size_upper_bound": 155815650
    },
    {
        "id": "6003587074473",
        "name": "Nhà đầu tư (đầu tư)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Nhà đầu tư (đầu tư)"
        ],
        "audience_size": 94405930,
        "audience_size_lower_bound": 80277151,
        "audience_size_upper_bound": 94405930
    },
    {
        "id": "362513380493102",
        "name": "Sửa Nhà Nhanh 24h",
        "type": "education_schools",
        "path": [
            "Nhân khẩu học",
            "Học vấn",
            "Trường học",
            "Sửa Nhà Nhanh 24h"
        ],
        "audience_size": 32187,
        "audience_size_lower_bound": 27369,
        "audience_size_upper_bound": 32187
    },
    {
        "id": "6003468776474",
        "name": "Zara (nhà bán lẻ)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Zara (nhà bán lẻ)"
        ],
        "audience_size": 152342109,
        "audience_size_lower_bound": 129542609,
        "audience_size_upper_bound": 152342109
    },
    {
        "id": "6012903127583",
        "name": "Thực phẩm và nhà hàng",
        "type": "industries",
        "path": [
            "Nhân khẩu học",
            "Công việc",
            "Ngành",
            "Thực phẩm và nhà hàng"
        ],
        "audience_size": 3882372,
        "audience_size_lower_bound": 3301336,
        "audience_size_upper_bound": 3882372,
        "description": "Những người có vai trò trong lĩnh vực thực phẩm và nhà hàng. Ví dụ bao gồm: nhân viên thu ngân, hầu bàn, bồi bàn nam, bồi bàn nữ, đầu bếp, nhân viên quán cà phê, nhân viên bếp, v.v."
    },
    {
        "id": "6003054185372",
        "name": "Người vừa chuyển nhà gần đây",
        "type": "life_events",
        "path": [
            "Nhân khẩu học",
            "Sự kiện trong đời",
            "Người vừa chuyển nhà gần đây"
        ],
        "audience_size": 660194,
        "audience_size_lower_bound": 561389,
        "audience_size_upper_bound": 660194,
        "description": "Những người đã cập nhật tỉnh/thành phố hiện tại mới trên trang cá nhân của họ trong 6 tháng qua"
    },
    {
        "id": "6002957026250",
        "name": "Nhà hát (nghệ thuật biểu diễn)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Giải trí (khái niệm xã hội)",
            "Sự kiện trực tiếp",
            "Nhà hát (nghệ thuật biểu diễn)"
        ],
        "audience_size": 602908620,
        "audience_size_lower_bound": 512677397,
        "audience_size_upper_bound": 602908620
    },
    {
        "id": "6020530269183",
        "name": "Quản trị viên trang Nhà hàng & Ẩm thực",
        "type": "behaviors",
        "path": [
            "Hành vi",
            "Hoạt động số",
            "Facebook page admins",
            "Quản trị viên trang Nhà hàng & Ẩm thực"
        ],
        "audience_size": 2218318,
        "audience_size_lower_bound": 1886324,
        "audience_size_upper_bound": 2218318,
        "description": "Những người là quản trị viên của trang nhà hàng & ẩm thực trên Facebook"
    },
    {
        "id": "6203619820983",
        "name": "Bạn bè của người vừa chuyển nhà gần đây",
        "type": "life_events",
        "path": [
            "Nhân khẩu học",
            "Sự kiện trong đời",
            "Bạn bè của",
            "Bạn bè của người vừa chuyển nhà gần đây"
        ],
        "audience_size": 1174014976,
        "audience_size_lower_bound": 998312054,
        "audience_size_upper_bound": 1174014976,
        "description": "Bạn bè của những người đã chuyển đến trong 30 ngày qua"
    },
    {
        "id": "6086568164383",
        "name": "Nhà phát triển API Tiếp thị (90 ngày qua)",
        "type": "behaviors",
        "path": [
            "Hành vi",
            "Hạng mục khác",
            "Nhà phát triển API Tiếp thị (90 ngày qua)"
        ],
        "audience_size": 854,
        "audience_size_lower_bound": 726,
        "audience_size_upper_bound": 854,
        "description": "Nhà phát triển ứng dụng đã dùng API Tiếp thị trên Facebook trong 90 ngày qua."
    },
    {
        "id": "6003418314031",
        "name": "Nhà (nhà cửa và vườn tược)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Nhà (nhà cửa và vườn tược)"
        ],
        "audience_size": 868808550,
        "audience_size_lower_bound": 738782780,
        "audience_size_upper_bound": 868808550
    },
    {
        "id": "6002897751962",
        "name": "Nhà bếp (nhà cửa và vườn tược)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Sở thích bổ sung",
            "Nhà bếp (nhà cửa và vườn tược)"
        ],
        "audience_size": 441410330,
        "audience_size_lower_bound": 375348920,
        "audience_size_upper_bound": 441410330
    },
    {
        "id": "6003234413249",
        "name": "Cải tạo nhà cửa (nhà cửa và vườn tược)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Cải tạo nhà cửa (nhà cửa và vườn tược)"
        ],
        "audience_size": 394840382,
        "audience_size_lower_bound": 335748624,
        "audience_size_upper_bound": 394840382
    },
    {
        "id": "360769134052325",
        "name": "Nhân viên kinh doanh, Sale,",
        "type": "work_positions",
        "path": [
            "Nhân khẩu học",
            "Công việc",
            "Chức danh",
            "Nhân viên kinh doanh, Sale,"
        ],
        "audience_size": 192457,
        "audience_size_lower_bound": 163653,
        "audience_size_upper_bound": 192457
    },
    {
        "id": "1432588070291470",
        "name": "Học Viện Cảnh Sát Nhân Dân",
        "type": "education_schools",
        "path": [
            "Nhân khẩu học",
            "Học vấn",
            "Trường học",
            "Học Viện Cảnh Sát Nhân Dân"
        ],
        "audience_size": 68099,
        "audience_size_lower_bound": 57907,
        "audience_size_upper_bound": 68099
    },
    {
        "id": "356495835163",
        "name": "THPT Trần Nhân Tông - Hà Nội",
        "type": "education_schools",
        "path": [
            "Nhân khẩu học",
            "Học vấn",
            "Trường học",
            "THPT Trần Nhân Tông - Hà Nội"
        ],
        "audience_size": 55875,
        "audience_size_lower_bound": 47512,
        "audience_size_upper_bound": 55875
    },
    {
        "id": "193599180788411",
        "name": "Sân Bay Quốc Tế Tân Sơn Nhất - Tan Son Nhat International...",
        "type": "work_employers",
        "path": [
            "Nhân khẩu học",
            "Công việc",
            "Nhà tuyển dụng",
            "Sân Bay Quốc Tế Tân Sơn Nhất - Tan Son Nhat International..."
        ],
        "audience_size": 26564,
        "audience_size_lower_bound": 22588,
        "audience_size_upper_bound": 26564
    },
    {
        "id": "360769134052325",
        "name": "Nhân viên kinh doanh, Sale,",
        "type": "work_employers",
        "path": [
            "Nhân khẩu học",
            "Công việc",
            "Nhà tuyển dụng",
            "Nhân viên kinh doanh, Sale,"
        ],
        "audience_size": 19581,
        "audience_size_lower_bound": 16650,
        "audience_size_upper_bound": 19581
    },
    {
        "id": "147111575428680",
        "name": "Ngân Hàng Nhà Nước Việt Nam",
        "type": "work_employers",
        "path": [
            "Nhân khẩu học",
            "Công việc",
            "Nhà tuyển dụng",
            "Ngân Hàng Nhà Nước Việt Nam"
        ],
        "audience_size": 11970,
        "audience_size_lower_bound": 10178,
        "audience_size_upper_bound": 11970
    },
    {
        "id": "1432588070291470",
        "name": "Học Viện Cảnh Sát Nhân Dân",
        "type": "work_employers",
        "path": [
            "Nhân khẩu học",
            "Công việc",
            "Nhà tuyển dụng",
            "Học Viện Cảnh Sát Nhân Dân"
        ],
        "audience_size": 9170,
        "audience_size_lower_bound": 7797,
        "audience_size_upper_bound": 9170
    },
    {
        "id": "6003132926214",
        "name": "Đồ nội thất (đồ nội thất)",
        "type": "interests",
        "path": [
            "Sở thích",
            "Đồ nội thất (đồ nội thất)"
        ],
        "audience_size": 614046470,
        "audience_size_lower_bound": 522148358,
        "audience_size_upper_bound": 614046470
    }
]