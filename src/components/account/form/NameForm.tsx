import { Input, Form } from 'antd';
import React from 'react';

interface Props {
  firstNameFormItemId: string;
  lastNameFormItemId: string;
  initialFirstName?: string;
  initialLastName?: string;
}
export const NameForm = (props: Props) => {
  const {
    firstNameFormItemId,
    lastNameFormItemId,
    initialFirstName,
    initialLastName,
  } = props;
  return (
    <section>
      <NameInputItem
        name={firstNameFormItemId}
        label="First name"
        validationMessage="Please enter your first name"
        placeholder="Enter first name"
        inputClass="required name-form__item"
        initialValue={initialFirstName}
      />

      <NameInputItem
        name={lastNameFormItemId}
        label="Last name"
        validationMessage="Please enter your last name"
        placeholder="Enter last name"
        inputClass="required name-form__item"
        initialValue={initialLastName}
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
const NameInputItem = ({
  name,
  label,
  initialValue,
  validationMessage,
  placeholder,
  inputClass,
}: NameInputItemProps) => (
  <Form.Item
    name={name}
    initialValue={initialValue}
    className="required name-form__item"
    label={label}
    required
    colon={false}
    rules={[
      {
        required: true,
        message: validationMessage,
      },
    ]}
  >
    <Input
      size="large"
      placeholder={placeholder}
      className={inputClass}
      aria-required
    />
  </Form.Item>
);
