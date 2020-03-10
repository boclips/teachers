import { Form } from 'antd';
import React, {RefObject} from 'react';
import { connect } from 'react-redux';
import { AgeRange } from 'src/types/AgeRange';
import { DurationRange } from 'src/types/DurationRange';
import { Range } from 'src/types/Range';
import { SubjectState } from 'src/types/State';
import { Subject } from 'src/types/Subject';
import {FormInstance} from "antd/lib/form";
import { SubjectsForm } from '../../../account/form/SubjectsForm';
import { AgeRangeSlider } from '../../../common/AgeRangeSlider';
import DurationSlider from '../../filters/DurationSlider';

export interface FilterFormEditableFields {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

export interface FilterProps {
  formRef: RefObject<FormInstance>;
  duration: DurationRange;
  ageRangeMin?: number;
  ageRangeMax?: number;
  subjectIds?: string[];
}

interface StateProps {
  subjects?: Subject[];
}

class FilterButtonForm extends React.Component<FilterProps & StateProps> {
  public render() {
    return (
      <Form
        ref={this.props.formRef}
        className="filter-form"
        initialValues={{
          duration: {
            min: this.props.duration && this.props.duration.min,
            max: this.props.duration && this.props.duration.max,
          },
          ageRange: {
            min: this.props.ageRangeMin,
            max: this.props.ageRangeMax,
          },
          subjects: this.props.subjectIds,
        }}
      >
        <Form.Item
          className="filter-form__item"
          label="Duration"
          name="duration"
        >
          <DurationSlider
            min={this.props.duration && this.props.duration.min}
            max={this.props.duration && this.props.duration.max}
            data-qa="duration-slider"
          />
        </Form.Item>
        <Form.Item
          className="filter-form__item"
          label="Age Range"
          name="ageRange"
        >
          <AgeRangeSlider
            ageRange={
              new AgeRange(this.props.ageRangeMin, this.props.ageRangeMax)
            }
            data-qa="age-range-slider"
          />
        </Form.Item>
        <SubjectsForm
          subjects={this.props.subjects}
          placeholder="Choose from our list.."
          label="Subject"
          data-qa="subject-filter-form"
        />
      </Form>
    );
  }
}

function mapStateToProps(state: SubjectState): StateProps {
  return { subjects: state.subjects };
}

export default connect(mapStateToProps)(FilterButtonForm);
