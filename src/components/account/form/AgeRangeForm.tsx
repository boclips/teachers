import React from 'react';
import { Form } from 'antd';
import { convertAgeRangesFromNumbers } from 'src/components/ageRanges/convertAgeRangesFromNumbers';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';

interface Props {
  formItemId: string;
  label?: string;
  initialValue?: number[];
}

export const AgeRangeForm = (props: Props) => {
  const allAgeRanges = useSelector((state: State) => state.ageRanges);

  const encodedInitialValues = props.initialValue
    ? convertAgeRangesFromNumbers(allAgeRanges, props.initialValue).map((age) =>
        age.encodeJSON(),
      )
    : [];

  return (
    <Form.Item
      name={props.formItemId}
      className="form__item age-range"
      label={props.label}
      data-qa="age-range-form"
      colon={false}
      rules={[{ type: 'array' }]}
      initialValue={encodedInitialValues}
    >
      <SelectAgeRange
        data-qa="age-select-input"
        allAgeRanges={allAgeRanges}
        initialValue={encodedInitialValues}
      />
    </Form.Item>
  );
};
