import { Form, Input } from 'antd';
import React from 'react';
import { FormComponentProps } from './FormComponentProps';

export class SubjectsForm extends React.Component<FormComponentProps> {
  public render() {
    return (
      <Form.Item>
        {this.props.form.getFieldDecorator('subjects', {
          rules: [],
        })(
          <Input
            data-qa="subjects"
            size="large"
            placeholder="Subject(s) taught"
          />,
        )}
      </Form.Item>
    );
  }
}
