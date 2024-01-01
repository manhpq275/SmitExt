import { Modal } from "antd";
import React from "react";

export default function UploadFormModal(props: any) {
  return (
    <Modal
      title={props.title}
      visible={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width={props.isNote ? 500 : 1000}
    >
      {props.children}
    </Modal>
  );
}
