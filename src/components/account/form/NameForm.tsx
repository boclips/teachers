import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

export class NameForm extends React.Component<FormComponentProps> {
  public render() {
    return (
      <section>
        <Form.Item label="First name" required={true}>
          {this.props.form.getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please enter your first name',
              },
            ],
          })(
            <Input
              data-qa="first-name"
              size="large"
              placeholder="Enter first name"
              className="name-form__first-name"
              aria-required={true}
            />,
          )}
        </Form.Item>
        <Form.Item label="Last name" required={true}>
          {this.props.form.getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter your last name',
              },
            ],
          })(
            <Input
              data-qa="last-name"
              size="large"
              placeholder="Enter last name"
              className="name-form__last-name"
              aria-required={true}
            />,
          )}
        </Form.Item>
      </section>
    );
  }
}
