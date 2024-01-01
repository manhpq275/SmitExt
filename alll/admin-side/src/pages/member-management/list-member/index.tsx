import { Table } from "antd";
import { useTranslation } from "react-i18next";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListMembersTableColumns } from "./tableColumns";
import { MemberMngmtSliceModule } from "../../../pages/_redux/member-management";

export default function ListMember() {
  const { t } = useTranslation();
  const dispactch = useDispatch();

  useMemo(() => dispactch(MemberMngmtSliceModule.getAllMembers()), []);

  const tableColumns: any = getListMembersTableColumns(showModal);
  const loading = useSelector(MemberMngmtSliceModule.getLoadingSelector);
  const listMembers = useSelector(
    MemberMngmtSliceModule.getListMembersSelector
  );

  function showModal(type: number, item: any) {}

  function handleCancel() {}

  function handleConfirm() {
    handleCancel();
  }

  return (
    <div className="admin-dashboard-container">
      <Table
        bordered
        loading={loading}
        columns={tableColumns}
        dataSource={listMembers}
      />
    </div>
  );
}
