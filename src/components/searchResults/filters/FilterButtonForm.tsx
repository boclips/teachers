import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { connect } from 'react-redux';
import { AgeRange } from 'src/types/AgeRange';
import { Range } from 'src/types/Range';
import { SubjectState } from 'src/types/State';
import { Subject } from 'src/types/Subject';
import { AgeRangeSlider } from '../../common/AgeRangeSlider';
import { SubjectsForm } from '../../account/form/SubjectsForm';
import DurationSlider from './DurationSlider';

export interface FilterFormEditableFields {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

export interface FilterProps {
  durationMin?: number;
  durationMax?: number;
  ageRangeMin?: number;
  ageRangeMax?: number;
  subjectIds?: string[];
}

interface StateProps {
  subjects?: Subject[];
}

interface Props extends FormComponentProps, FilterProps, StateProps {}

class FilterButtonForm extends React.Component<Props> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="filter-form">
        <Form.Item className="filter-form__item" label="Duration">
          {getFieldDecorator('duration', {
            initialValue: {
              min: this.props.durationMin,
              max: this.props.durationMax,
            },
          })(
            <DurationSlider
              min={this.props.durationMin}
              max={this.props.durationMax}
              data-qa="duration-slider"
            />,
          )}
        </Form.Item>
        <Form.Item className="filter-form__item" label="Age Range">
          {getFieldDecorator('ageRange', {
            initialValue: {
              min: this.props.ageRangeMin,
              max: this.props.ageRangeMax,
            },
          })(
            <AgeRangeSlider
              ageRange={
                new AgeRange(this.props.ageRangeMin, this.props.ageRangeMax)
              }
              data-qa="age-range-slider"
            />,
          )}
        </Form.Item>
        <SubjectsForm
          subjects={this.props.subjects}
          placeholder="Choose from our list.."
          label="Subject"
          initialValue={this.props.subjectIds}
          form={this.props.form}
          data-qa="subject-filter-form"
        />
      </Form>
    );
  }
}

function mapStateToProps(state: SubjectState): StateProps {
  return {
    subjects: state.subjects,
  };
}

export default connect(mapStateToProps)(
  Form.create<Props & FilterFormEditableFields>()(FilterButtonForm),
);
