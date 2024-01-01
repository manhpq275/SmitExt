import React from "react";
import moment from "moment";
import { t } from "i18next";
import { Button } from "antd";
import Tooltip from "antd/es/tooltip";

export const getListMembersTableColumns = (showModal: Function) => {
  return [
    {
      key: "id",
      width: 50,
      title: "ID",
      dataIndex: "id",
      render: (id: string) => (
        <Tooltip placement="topLeft" title={id}>
          <span className="user-id">{id}</span>
        </Tooltip>
      ),
    },
    {
      key: "displayName",
      title: "Nhân viên",
      dataIndex: "displayName",
    },
    {
      key: "total-item",
      title: "Tổng số item",
    },
    {
      key: "item-success",
      title: "Số item success",
    },
    {
      key: "item-fail",
      title: "Số item fail",
    },
    {
      key: "action",
      width: 150,
      title: "Action",
      align: "center",
      render: (item: any) => <u onClick={() => showModal()}>Xem chi tiết</u>,
    },
  ];
};
