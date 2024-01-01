import "./style.scss";

import { RcFile } from "antd/lib/upload";
import { useTranslation } from "react-i18next";
import React, { useMemo, useState } from "react";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import CModal from "pages/_components/common/c-modal";
import { useDispatch, useSelector } from "react-redux";
import { getListUsersTableColumns } from "./tableColumns";
import { Button, Table, Upload, UploadFile, UploadProps } from "antd";
import { UserManagementSliceModule } from "pages/_redux/user-management";

export default function ListUser() {
  const { t } = useTranslation();
  const dispactch = useDispatch();

  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useMemo(() => dispactch(UserManagementSliceModule.getAllUsers()), []);
  const tableColumns: any = getListUsersTableColumns(showModal);
  const loading = useSelector(UserManagementSliceModule.getLoadingSelector);
  const listUsers = useSelector(UserManagementSliceModule.getListUsersSelector);
  const uploading = useSelector(
    UserManagementSliceModule.getUploadLoadingSelector
  );

  function addMember() {}

  function showModal(type: number, item: any) {
    setOpen(true);
    setUserID(item.id);
    switch (type) {
      case 1: {
        break;
      }
      case 2: {
        break;
      }
      case 3: {
        break;
      }
      default:
        break;
    }
  }

  function handleCancel() {
    setOpen(false);
    setUserID(null);
  }

  function handleConfirm() {
    handleCancel();
  }

  const handleUpload = () => {
    if (userID) {
      const formData = new FormData();
      formData.append("file", fileList[0] as RcFile);
      formData.append("userID", userID);
      dispactch(UserManagementSliceModule.uploadResourceFile(formData))
        .then(() => {})
        .catch(() => {})
        .finally(() => setOpen(false));
    }
  };

  const props: UploadProps = {
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setFileList([file]);
      }
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    maxCount: 1,
  };

  return (
    <div className="admin-dashboard-container">
      <div className="button-get-data">
        <Button type="primary" onClick={() => addMember()}>
          {t("userMngmt.button.createUser")}
        </Button>
      </div>
      <Table
        bordered
        loading={loading}
        columns={tableColumns}
        dataSource={listUsers}
      />

      <CModal
        open={open}
        footer={null}
        title="Upload File"
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        {fileList.length ? (
          <div className="file-container">
            <span>{fileList[0].name}</span>
            <div className="close-btn" onClick={() => setFileList([])}>
              <CloseOutlined />
            </div>
          </div>
        ) : (
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Upload.Dragger>
        )}

        <div className="upload-btn">
          <Button
            type="primary"
            loading={uploading}
            onClick={handleUpload}
            style={{ marginTop: 16 }}
            disabled={!fileList.length}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </div>
      </CModal>
    </div>
  );
}
