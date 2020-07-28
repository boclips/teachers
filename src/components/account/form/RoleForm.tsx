import { Select, Form } from 'antd';
import React from 'react';

interface Props {
  formItemId: string;
  onChange?: (value) => void;
}
export const RoleForm = ({ onChange, formItemId }: Props) => (
  <Form.Item
    name={formItemId}
    label={"I'm a"}
    colon={false}
    className="required name-form__role form__item"
    rules={[
      {
        required: true,
        message: 'Please select your role',
      },
    ]}
  >
    <Select
      data-qa="select-role"
      size="large"
      className="boclips-multi-select-selection"
      onChange={onChange}
      placeholder="Select your role"
    >
      <Select.Option value="TEACHER" data-state="TEACHER">
        Teacher
      </Select.Option>
      <Select.Option value="PARENT" data-state="PARENT">
        Parent
      </Select.Option>
      <Select.Option value="SCHOOLADMIN" data-state="SCHOOLADMIN">
        School admin
      </Select.Option>
      <Select.Option value="OTHER">Other</Select.Option>
    </Select>
  </Form.Item>
);
