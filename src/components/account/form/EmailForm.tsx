import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { FormComponentProps } from './FormComponentProps';

export class EmailForm extends React.Component<FormComponentProps> {
  public render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16 }} xl={{ span: 16 }}>
          <Form.Item>
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
            })(<Input data-qa="email" size="large" placeholder="Email" />)}
          </Form.Item>
        </Col>
      </Row>
    );
  }
}
