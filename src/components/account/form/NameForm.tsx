import { Form } from '@ant-design/compatible';
import { Input } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';

interface Props {
  initialFirstName?: string;
  initialLastName?: string;
}

export class NameForm extends React.Component<FormComponentProps & Props> {
  public render() {
    return (
      <section>
        <Form.Item
          className="required name-form__item"
          label="First name"
          required={true}
          colon={false}
        >
          {this.props.form.getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please enter your first name',
              },
            ],
            initialValue: this.props.initialFirstName,
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
        <Form.Item
          className="required name-form__item"
          label="Last name"
          required={true}
          colon={false}
        >
          {this.props.form.getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter your last name',
              },
            ],
            initialValue: this.props.initialLastName,
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
