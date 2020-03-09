import { Form } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { AgeRange } from 'src/types/AgeRange';
import { DurationRange } from 'src/types/DurationRange';
import { Range } from 'src/types/Range';
import { SubjectState } from 'src/types/State';
import { Subject } from 'src/types/Subject';
import { SubjectsForm } from '../../../account/form/SubjectsForm';
import { AgeRangeSlider } from '../../../common/AgeRangeSlider';
import DurationSlider from '../../filters/DurationSlider';

export interface FilterFormEditableFields {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

export interface FilterProps {
  duration: DurationRange;
  ageRangeMin?: number;
  ageRangeMax?: number;
  subjectIds?: string[];
}

interface StateProps {
  subjects?: Subject[];
}

interface Props extends FilterProps, StateProps {}

class FilterButtonForm extends React.Component<Props> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="filter-form">
        <Form.Item className="filter-form__item" label="Duration">
          {getFieldDecorator('duration', {
            initialValue: {
              min: this.props.duration && this.props.duration.min,
              max: this.props.duration && this.props.duration.max,
            },
          })(
            <DurationSlider
              min={this.props.duration && this.props.duration.min}
              max={this.props.duration && this.props.duration.max}
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
          // form={this.props.form}
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
  Form.create<>()(FilterButtonForm),
);
