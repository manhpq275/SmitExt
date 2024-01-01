import "./style.scss";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Form, Input, Button } from "antd";
import { useLocation } from "react-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import useAuth from "HOC/useAuth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthSliceModule } from "pages/_redux/auth";

export default function Login() {
  const isAuth = useAuth();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    isAuth && navigate("/dashboard");
  }, [isAuth]);

  const onFinish = (values: any) => {
    dispatch(AuthSliceModule.login(values));
  };

  return (
    <div className="admin-login-page">
      <div className="main">
        <div className="login-title">{t("login.label.login")}</div>
        <Form
          onFinish={onFinish}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: t("validation.invalidEmail"),
              },
              {
                required: true,
                message: t("validation.requireEmail"),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("login.text.email")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("validation.requirePassword") },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t("login.text.password")}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {t("login.label.login")}
            </Button>
          </Form.Item>
        </Form>
        <Link to="/admin/forgot-password" className="login-form-forgot">
          {t("login.label.forgotPassword")}
        </Link>
      </div>
    </div>
  );
}
