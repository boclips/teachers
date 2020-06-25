import { Form } from '@ant-design/compatible';

import { Select } from 'antd';
import React from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';

export interface Props {
  onRoleChange: (value) => void;
}

export const RoleForm = (props: FormComponentProps & Props) => (
  <Form.Item
    label={"I'm a"}
    colon={false}
    className="name-form__role form__item"
  >
    {props.form.getFieldDecorator('role', {
      rules: [
        {
          required: true,
          message: 'Please select your role',
        },
      ],
    })(
      <Select
        data-qa="select-role"
        size="large"
        className={'boclips-multi-select-selection'}
        onChange={(value: string) => props.onRoleChange({ role: value })}
        placeholder="Select your role"
      >
        <Select.Option value="TEACHER" data-state="TEACHER">
          {'Teacher'}
        </Select.Option>
        <Select.Option value="PARENT" data-state="PARENT">
          {'Parent'}
        </Select.Option>
        <Select.Option value="SCHOOLADMIN" data-state="SCHOOLADMIN">
          {'School admin'}
        </Select.Option>
        <Select.Option value="OTHER">{'Other'}</Select.Option>
      </Select>,
    )}
  </Form.Item>
);
