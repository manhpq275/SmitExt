import React from "react";
import moment from "moment";
import { Badge, Button } from "antd";
import Tooltip from "antd/es/tooltip";
import { setColorStatus } from "./helper";
import { DownloadOutlined } from "@ant-design/icons";

export const getIpTableColumns = (viewDetail: Function, exportData: Function) => {
  return [
    {
      width: 50,
      title: "STT",
      dataIndex: "key",
    },
    {
      width: 250,
      title: "Facebook Uid",
      dataIndex: "fbUid",
      render: (fbUid: string) => (
        <Tooltip placement="topLeft" title={fbUid}>
          {fbUid}
        </Tooltip>
      ),
    },
    {
      width: 250,
      title: "IP",
      dataIndex: "ipAddress",
      render: (ipAddress: string) => (
        <Tooltip placement="topLeft" title={ipAddress}>
          {ipAddress}
        </Tooltip>
      ),
    },
    {
      width: 250,
      title: "Country",
      dataIndex: "countryName",
      render: (countryName: string) => (
        <Tooltip placement="topLeft" title={countryName}>
          {countryName}
        </Tooltip>
      ),
    },
    {
      title: "Update At",
      dataIndex: "updatedAt",
      render: (updatedAt: string) => (
        <Tooltip placement="topLeft" title={moment(updatedAt).format("DD-MM-YYYY")}>
          {moment(updatedAt).format("DD-MM-YYYY")}
        </Tooltip>
      ),
    },
    {
      width: 150,
      align: "center",
      title: "Xem chi tiết",
      render: (item: any) => <Button onClick={() => viewDetail(item)}>Xem chi tiết</Button>,
    },
    {
      width: 120,
      align: "center",
      title: "Export Data",
      render: (item: any) => <Button icon={<DownloadOutlined />} onClick={() => exportData(item)}></Button>,
    },
  ];
};

export const getAdsInfoColumns = () => {
  return [
    {
      width: 50,
      title: "TT",
      align: "center",
      dataIndex: "status",
      render: (item: any) => {
        return <Badge showZero color={setColorStatus(item)} />
      },
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Số dư",
      dataIndex: "surplus",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Ngưỡng",
      dataIndex: "threshold_amount",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Limit",
      dataIndex: "limit",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Tổng tiêu",
      dataIndex: "total",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Tiền tệ",
      dataIndex: "currency",
      ellipsis: true,
      width: 120,
    }
  ];
};
