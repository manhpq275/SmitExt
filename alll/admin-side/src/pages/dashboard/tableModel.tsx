import React, { useState } from "react";
import { Button, Input, Table } from "antd";

export default function TableModel({
  columns,
  dataSource,
  onSearching,
  isSearch = false,
}: any) {
  const [value, setValue] = useState("");

  function onInputEnter(e: any) {
    if (e.code === "Enter") onSearch();
  }

  function onSearch() {
    onSearching(value);
  }

  return (
    <div>
      {isSearch && (
        <div className="dashboard-filter">
          <Input
            className="dashboard-filter-input"
            placeholder="Input HotKey"
            value={value}
            onKeyDown={(e) => onInputEnter(e)}
            onChange={(e) => setValue(e.target.value.trim())}
          />
          <Button
            type="primary"
            onClick={onSearch}
            className="dashboard-filter-button"
          >
            Search
          </Button>
        </div>
      )}
      <Table bordered size="small" columns={columns} dataSource={dataSource} />
    </div>
  );
}
