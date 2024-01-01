import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

export default function EditAbleField(props: any) {
  return (
    <TextArea
      rows={4}
      value={props.content}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
