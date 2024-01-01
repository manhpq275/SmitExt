import React from "react";
import moment from "moment";
import { t } from "i18next";
import { Button } from "antd";
import Tooltip from "antd/es/tooltip";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

export const getListUsersTableColumns = (showModal: Function) => {
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
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "displayName",
      title: "displayName",
      dataIndex: "displayName",
    },
    {
      key: "phone",
      title: "phone",
      dataIndex: "phone",
    },
    {
      key: "role",
      title: "role",
      dataIndex: "role",
    },
    {
      key: "createdAt",
      title: "createdAt",
      dataIndex: "createdAt",
      render: (createdAt: string) => (
        <span>{moment(createdAt).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      width: 250,
      align: "center",
      key: "File Status",
      title: "File Status",
      render: (item: any) => {
        let statusButton;
        if (item.filePath) {
          const buttonText = t("userMngmt.button.uploaded");
          statusButton = <Button className="uploaded">{buttonText}</Button>;
        } else {
          const buttonText = t("userMngmt.button.notUploadYet");
          statusButton = <Button className="not-uploaded">{buttonText}</Button>;
        }
        return (
          <div>
            {statusButton}
            <Button
              size="middle"
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => showModal(2, item)}
            />
          </div>
        );
      },
    },
    {
      key: "action",
      width: 100,
      title: "Action",
      align: "center",
      render: (item: any) => <DeleteOutlined onClick={() => {}} />,
    },
  ];
};
