import "./style.scss";

import { IUser } from "models/bases";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";
import { AuthSliceModule } from "pages/_redux/auth";
import { Menu, Dropdown, Image, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo: IUser | any = useSelector(AuthSliceModule.getUserSelector);

  const handleLogout = () => {
    dispatch(AuthSliceModule.logout());
  };

  const goToMyPage = () => {
    navigate("/personal-information");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "0",
          onClick: goToMyPage,
          label: t("header.label.myInformation"),
        },
        { key: "1", onClick: handleLogout, label: t("header.label.logout") },
      ]}
    />
  );

  return (
    <div className="admin-header ">
      <div className="header-logo">
        <span className="header-logo__text">Trang Quản Trị</span>
      </div>
      <div className="">
        <div className="header-icon">
          <i className="fas fa-info-circle"></i>
        </div>
        <div className="header-icon">
          <i className="fas fa-bell"></i>
        </div>
        <div className="header-icon">
          <i className="fas fa-cog"></i>
        </div>
        <div className="user-information">
          <div className="user-avatar">
            <Avatar icon={<UserOutlined />} size={"large"} />
          </div>
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <div className="user-name">
              <span className="user-name--title">{userInfo?.displayName}</span>
              <span className="user-name--sub-title">{userInfo?.role}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
