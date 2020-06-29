import { Form } from '@ant-design/compatible';
import { Input } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';

export class EmailForm extends React.Component<FormComponentProps> {
  public render() {
    return (
      <Form.Item
        label="Work Email:"
        required={false}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        className="email-form__container"
        colon
      >
        {this.props.form.getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid email',
            },
            {
              required: true,
              message: 'Please enter your email',
            },
          ],
        })(
          <Input
            data-qa="email"
            size="large"
            placeholder="Enter your email"
            aria-required={true}
          />,
        )}
      </Form.Item>
    );
  }
}
