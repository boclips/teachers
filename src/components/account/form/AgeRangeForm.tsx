import React from 'react';
import { Form } from 'antd';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';

interface Props {
  formItemId: string;
  label?: string;
  initialValue?: number[];
}

export const AgeRangeForm = (props: Props) => {
  return (
    <Form.Item
      name={props.formItemId}
      className="form__item age-range"
      label={props.label}
      data-qa="age-range-form"
      colon={false}
      rules={[{ type: 'array' }]}
    >
      <SelectAgeRange
        data-qa="age-select-input"
        initialValue={props.initialValue}
      />
    </Form.Item>
  );
};
