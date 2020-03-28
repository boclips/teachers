import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';
import { convertAgeRangesFromNumbers } from 'src/components/ageRanges/convertAgeRangesFromNumbers';
import { useSelector } from 'react-redux';
import State from 'src/types/State';

interface Props {
  label?: string;
  initialValue?: number[];
}

export const AgeRangeForm = (props: FormComponentProps & Props) => {
  const allAgeRanges = useSelector((state: State) => state.ageRanges);

  return (
    <Form.Item label={props.label} data-qa={'age-range-form'} colon={false}>
      {props.form.getFieldDecorator('ageRange', {
        rules: [{ type: 'array' }],
        initialValue: props.initialValue
          ? convertAgeRangesFromNumbers(
              allAgeRanges,
              props.initialValue,
            ).map(age => age.encodeJSON())
          : [],
      })(
        <SelectAgeRange
          data-qa={'age-select-input'}
          initialValue={props.initialValue}
        />,
      )}
    </Form.Item>
  );
};
