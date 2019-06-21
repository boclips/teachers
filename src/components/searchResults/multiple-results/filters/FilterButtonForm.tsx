import { Form } from 'antd';
import React from 'react';
import { Range } from '../../../../types/Range';
import { FormComponentProps } from '../../../account/form/FormComponentProps';
import AgeRangeSlider from '../../../common/AgeRangeSlider';
import DurationSlider from './DurationSlider';

export interface FilterFormEditableFields {
  duration?: Range;
  ageRange?: Range;
}

export interface FilterProps {
  durationMin?: number;
  durationMax?: number;
  ageRangeMin?: number;
  ageRangeMax?: number;
}

class FilterButtonForm extends React.Component<
  FormComponentProps & FilterProps
> {
  private onDurationChange = (duration: Range) => {
    this.props.form.setFieldsValue({ duration });
  };
  private onAgeRangeChange = (ageRange: Range) => {
    this.props.form.setFieldsValue({ ageRange });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="filter-form">
        <Form.Item className="filter-form__item" label="Duration">
          {getFieldDecorator('duration')(
            <DurationSlider
              min={this.props.durationMin}
              max={this.props.durationMax}
              onChange={this.onDurationChange}
            />,
          )}
        </Form.Item>
        <Form.Item className="filter-form__item" label="Age Range">
          {getFieldDecorator('ageRange')(
            <AgeRangeSlider
              minAge={this.props.ageRangeMin}
              maxAge={this.props.ageRangeMax}
              onChange={this.onAgeRangeChange}
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<FilterFormEditableFields>()(FilterButtonForm);
