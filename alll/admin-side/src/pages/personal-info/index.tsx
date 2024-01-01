import "./style.scss";

import React, { useRef, useState } from "react";
import { IUser } from "models/bases";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Modal, Typography } from "antd";
import { AuthSliceModule } from "pages/_redux/auth";
import PersonalInfoRepository from "data/repositories/PersonalInfoRepository";

const { Title, Text } = Typography;

export default function PersonalInfo() {
  const personalInfoRepository = new PersonalInfoRepository();

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const changePasswordForm: any = useRef(null);

  const userInfo: IUser | any = useSelector(AuthSliceModule.getUserSelector);

  function handleConfirm() {
    if (changePasswordForm.current) {
      changePasswordForm.current.submit();
    }
  }

  function hideModal() {
    setOpen(false);

    if (changePasswordForm.current) {
      changePasswordForm.current.resetFields();
    }
  }

  function handleSubmitForm(data: any) {
    personalInfoRepository
      .changePassword(data["new-password"])
      .then((res) => hideModal());
  }

  return (
    <div className="personal-content">
      <div className="header-container">
        <Title level={4}>{t("personalInfo.label.personalInfomation")}</Title>
        <Button type="primary" onClick={() => setOpen(true)}>
          Đổi mật khẩu
        </Button>
      </div>

      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 0 }}
        style={{ marginTop: 30 }}
      >
        <Form.Item label="Tên người dùng">
          <Text>{userInfo.displayName}</Text>
        </Form.Item>
        <Form.Item label="Email">
          <Text>{userInfo.email}</Text>
        </Form.Item>
        <Form.Item label="Phone">
          <Text>{userInfo.phone}</Text>
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Text>{userInfo.address}</Text>
        </Form.Item>
      </Form>

      <Modal
        title="Thay đổi mật khẩu"
        width={500}
        visible={open}
        onOk={handleConfirm}
        onCancel={hideModal}
      >
        <Form
          autoComplete="off"
          name="change-password"
          labelCol={{ span: 9 }}
          ref={changePasswordForm}
          wrapperCol={{ span: 15 }}
          onFinish={handleSubmitForm}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Mật khẩu mới"
            name="new-password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirm-new-password"
            dependencies={["new-password"]}
            rules={[
              { required: true, message: "Please input your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new-password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
