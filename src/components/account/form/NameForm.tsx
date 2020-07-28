import { Input, Form } from 'antd';
import React from 'react';

interface Props {
  firstNameFormItemId: string;
  lastNameFormItemId: string;
  initialFirstName?: string;
  initialLastName?: string;
}
export const NameForm = (props: Props) => {
  return (
    <section>
      <NameInputItem
        name={props.firstNameFormItemId}
        label="First name"
        validationMessage="Please enter your first name"
        placeholder="Enter first name"
        inputClass="required name-form__item"
        initialValue={props.initialFirstName}
      />

      <NameInputItem
        name={props.lastNameFormItemId}
        label="Last name"
        validationMessage="Please enter your last name"
        placeholder="Enter last name"
        inputClass="required name-form__item"
        initialValue={props.initialLastName}
      />
    </section>
  );
};

interface NameInputItemProps {
  name: string;
  label: string;
  validationMessage: string;
  placeholder: string;
  inputClass: string;
  initialValue?: string;
}
const NameInputItem = (props: NameInputItemProps) => (
  <Form.Item
    name={props.name}
    initialValue={props.initialValue}
    className="required name-form__item"
    label={props.label}
    required
    colon={false}
    rules={[
      {
        required: true,
        message: props.validationMessage,
      },
    ]}
  >
    <Input
      size="large"
      placeholder={props.placeholder}
      className={props.inputClass}
      aria-required
    />
  </Form.Item>
);
