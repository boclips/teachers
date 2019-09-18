import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { AgeRange } from '../../../types/AgeRange';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';

interface Props {
  label?: string;
  initialValue?: number[];
}

export class AgeRangeForm extends React.Component<FormComponentProps & Props> {
  public onUpdateAgeRange = (value: string[]) => {
    this.props.form.setFieldsValue({ ageRange: value });
  };

  public render() {
    return (
      <Form.Item label={this.props.label} data-qa={'age-range-form'}>
        {this.props.form.getFieldDecorator('ageRange', {
          rules: [{ type: 'array' }],
          initialValue: this.props.initialValue
            ? AgeRange.generateAgeRanges(this.props.initialValue).map(age =>
                age.encodeJSON(),
              )
            : [],
        })(
          <SelectAgeRange
            onUpdateAgeRange={this.onUpdateAgeRange}
            data-qa={'age-select-input'}
            initialValue={this.props.initialValue}
          />,
        )}
      </Form.Item>
    );
  }
}
