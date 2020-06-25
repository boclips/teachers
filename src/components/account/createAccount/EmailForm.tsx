import { Form } from '@ant-design/compatible';
import { Col, Input, Row } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';

export class EmailForm extends React.Component<FormComponentProps> {
  public render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16 }} xl={{ span: 16 }}>
          <Form.Item label="Work Email" required={false}>
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
        </Col>
      </Row>
    );
  }
}
