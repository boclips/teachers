import { Form } from 'antd';
import React from 'react';
import { Range } from '../../../types/Range';
import { FormComponentProps } from '../../account/form/FormComponentProps';
import DurationSlider from './DurationSlider';

export interface FilterFormEditableFields {
  duration?: Range;
}

export interface FilterProps {
  minDuration?: number;
  maxDuration?: number;
}

class FilterButtonForm extends React.Component<
  FormComponentProps & FilterProps
> {
  private onDurationChange = (duration: Range) => {
    this.props.form.setFieldsValue({ duration });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="filter-form">
        <Form.Item className="filter-form__item" label="Duration">
          {getFieldDecorator('duration')(
            <DurationSlider
              min={this.props.minDuration}
              max={this.props.maxDuration}
              onChange={this.onDurationChange}
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<FilterFormEditableFields>()(FilterButtonForm);
