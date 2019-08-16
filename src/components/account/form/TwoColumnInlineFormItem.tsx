import { Col, Form } from 'antd';
import React from 'react';
import '../CreateAccountForm.less';

interface Props {
  label?: string;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

const TwoColumnInlineForm = React.memo((props: Props) => (
  <Form.Item className="create-account-form__inline-item" label={props.label}>
    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 12 }}>
      <Form.Item className="create-account-form__inline-item--left">
        {props.leftColumn}
      </Form.Item>
    </Col>
    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 12 }}>
      <Form.Item className="create-account-form__inline-item--right">
        {props.rightColumn}
      </Form.Item>
    </Col>
  </Form.Item>
));

export default TwoColumnInlineForm;
