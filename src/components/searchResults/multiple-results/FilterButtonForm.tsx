import { Form } from 'antd';
import React from 'react';
import { FormComponentProps } from '../../account/form/FormComponentProps';
import DurationSlider from './DurationSlider';

interface EditableFields {
  duration?: {
    min: number;
    max: number;
  };
}

class FilterButtonForm extends React.Component<FormComponentProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="filter-form">
        <Form.Item className="filter-form__item">
          {getFieldDecorator('duration')(<DurationSlider />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<EditableFields>()(FilterButtonForm);
