import { Form } from 'antd';
import React from 'react';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';

interface Props {
  label?: string;
  initialValue?: number[];
}

export class AgeRangeForm extends React.Component<Props> {
  public render() {
    return (
      <Form.Item
        label={this.props.label}
        data-qa={'age-range-form'}
        colon={false}
        name={'ageRange'}
        rules={[{ type: 'array' }]}
      >
        <SelectAgeRange
          data-qa={'age-select-input'}
          initialValue={this.props.initialValue}
        />
      </Form.Item>
    );
  }
}
