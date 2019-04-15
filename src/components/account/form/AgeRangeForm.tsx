import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { SelectValue } from 'antd/lib/select';
import React from 'react';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';

interface Props {
  ageRanges: AgeRange[];
}

export class AgeRangeForm extends React.Component<FormComponentProps & Props> {
  public onUpdateAgeRange = (value: SelectValue) => {
    this.props.form.setFieldsValue({ ageRanges: value });
  };

  public render() {
    return (
      <Form.Item>
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
