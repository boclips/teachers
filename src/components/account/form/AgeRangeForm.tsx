import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { AgeRange } from '../../../types/AgeRange';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';

interface Props {
  ageRanges: AgeRange[];
  label?: string;
  initialValue?: AgeRange[];
}

export class AgeRangeForm extends React.Component<FormComponentProps & Props> {
  public onUpdateAgeRange = (value: number[]) => {
    console.log(value);
    this.props.form.setFieldsValue({ ageRange: value });
  };

  public render() {
    return (
      <Form.Item label={this.props.label}>
        {this.props.form.getFieldDecorator('ageRange', {
          rules: [{ type: 'array' }],
          initialValue: [],
        })(
          <SelectAgeRange
            ageRanges={this.props.ageRanges}
            onUpdateAgeRange={this.onUpdateAgeRange}
          />,
        )}
      </Form.Item>
    );
  }
}
