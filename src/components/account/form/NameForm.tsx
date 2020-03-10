import { Form, Input } from 'antd';
import React from 'react';

export class NameForm extends React.Component {
  public render() {
    return (
      <section>
        <Form.Item
          name="firstName"
          label="First name"
          rules={[
            {
              required: true,
              message: 'Please enter your first name',
            },
          ]}
          colon={false}
        >
          <Input
            data-qa="first-name"
            size="large"
            placeholder="Enter first name"
            className="name-form__first-name"
            aria-required={true}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last name"
          required={true}
          colon={false}
          rules={[
            {
              required: true,
              message: 'Please enter your last name',
            },
          ]}
        >
          <Input
            data-qa="last-name"
            size="large"
            placeholder="Enter last name"
            className="name-form__last-name"
            aria-required={true}
          />
        </Form.Item>
      </section>
    );
  }
}
