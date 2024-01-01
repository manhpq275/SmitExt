import { Modal } from "antd";

export default function ModelForm(props: any) {
  return (
    <Modal
      width={1000}
      title={props.title}
      visible={props.open}
      footer={props.footer || null}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      {props.children}
    </Modal>
  );
}
