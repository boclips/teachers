import { Form } from 'antd';
import React from 'react';
import { FormComponentProps } from '../../account/form/FormComponentProps';
import DurationSlider, { Range } from './DurationSlider';

export interface FilterFormEditableFields {
  duration?: Range;
}

class FilterButtonForm extends React.Component<FormComponentProps> {
  private onDurationChange = (duration: Range) => {
    this.props.form.setFieldsValue({ duration });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="filter-form">
        <Form.Item className="filter-form__item" label="Duration">
          {getFieldDecorator('duration')(
            <DurationSlider onChange={this.onDurationChange} />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<FilterFormEditableFields>()(FilterButtonForm);
