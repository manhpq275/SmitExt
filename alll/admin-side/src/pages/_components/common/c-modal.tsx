import { Modal } from "antd";

export default function CModal(props: any) {
  return (
    <Modal
      title={props.title}
      visible={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width={props.isNote ? 500 : 1000}
      footer={props.footer}
    >
      {props.children}
    </Modal>
  );
}
