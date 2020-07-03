import { Form } from '@ant-design/compatible';
import { Input } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';

interface Props {
  initialFirstName?: string;
  initialLastName?: string;
}

export const NameForm = (props: FormComponentProps & Props) => {
  return (
    <section>
      <Form.Item
        className="required name-form__item"
        label="First name"
        required
        colon={false}
      >
        {props.form.getFieldDecorator('firstName', {
          rules: [
            {
              required: true,
              message: 'Please enter your first name',
            },
          ],
          initialValue: props.initialFirstName,
        })(
          <Input
            data-qa="first-name"
            size="large"
            placeholder="Enter first name"
            className="name-form__first-name"
            aria-required
          />,
        )}
      </Form.Item>

      <Form.Item
        className="required name-form__item"
        label="Last name"
        required
        colon={false}
      >
        {props.form.getFieldDecorator('lastName', {
          rules: [
            {
              required: true,
              message: 'Please enter your last name',
            },
          ],
          initialValue: props.initialLastName,
        })(
          <Input
            data-qa="last-name"
            size="large"
            placeholder="Enter last name"
            className="name-form__last-name"
            aria-required
          />,
        )}
      </Form.Item>
    </section>
  );
};
