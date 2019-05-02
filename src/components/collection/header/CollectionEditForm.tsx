import { Checkbox, Form, Input, Slider } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { connect } from 'react-redux';
import State from '../../../types/State';
import { SubjectsForm } from '../../account/form/SubjectsForm';
import './CollectionEditForm.less';

export interface EditableFields {
  title: string;
  isPublic: boolean;
  subjects: string[];
  ageRange?: number[];
}

export interface Props extends EditableFields {
  onAgeRangeChange: (e) => void;
  sliderRange: { min: number; max: number };
}

class CollectionEditForm extends React.PureComponent<
  Props & ReturnType<typeof mapStateToProps> & FormComponentProps
> {
  private marks = {
    3: '3',
    5: '5',
    7: '7',
    9: '9',
    11: '11',
    14: '14',
    16: '16',
    18: '18',
    19: '19+',
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="form">
        <Form.Item className="form__item">
          {getFieldDecorator('title', { initialValue: this.props.title })(
            <Input data-qa="title-edit" />,
          )}
        </Form.Item>
        <Form.Item className="form__item">
          {getFieldDecorator('isPublic', {
            valuePropName: 'checked',
            initialValue: this.props.isPublic,
          })(
            <Checkbox data-qa="visibility-edit">
              Public (anyone can see it)
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item className="form__item">
          {getFieldDecorator('ageRange', {
            initialValue: this.props.ageRange,
          })(
            <Slider
              min={this.props.sliderRange.min}
              max={this.props.sliderRange.max}
              range={true}
              marks={this.marks}
              onChange={this.props.onAgeRangeChange}
              step={null}
            />,
          )}
        </Form.Item>
        <SubjectsForm
          form={this.props.form}
          subjects={this.props.subjectsInStore}
          placeholder="Subjects"
          initialValue={this.props.subjects}
        />
      </Form>
    );
  }
}

const mapStateToProps = (state: State) => ({
  subjectsInStore: state.subjects,
});

export default connect(mapStateToProps)(
  Form.create<EditableFields>()(CollectionEditForm),
);
