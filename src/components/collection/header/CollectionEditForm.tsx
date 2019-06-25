import { Checkbox, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { connect } from 'react-redux';
import State from '../../../types/State';
import { SubjectsForm } from '../../account/form/SubjectsForm';
import AgeRangeSlider from '../../common/AgeRangeSlider';
import './CollectionEditForm.less';

export interface EditableFields {
  title: string;
  isPublic: boolean;
  subjects: string[];
  ageRange?: number[];
}

export interface Props extends EditableFields, FormComponentProps {
  onAgeRangeChange: (e) => void;
}

class CollectionEditForm extends React.PureComponent<
  Props & ReturnType<typeof mapStateToProps>
> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="form-edit-collection">
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
        <Form.Item className="form__item" label="Age">
          {getFieldDecorator('ageRange', {
            initialValue: this.props.ageRange,
          })(
            <AgeRangeSlider
              min={this.props.ageRange && this.props.ageRange[0]}
              max={this.props.ageRange && this.props.ageRange[1]}
              onChange={this.props.onAgeRangeChange}
            />,
          )}
        </Form.Item>
        <SubjectsForm
          form={this.props.form}
          subjects={this.props.subjectsInStore}
          placeholder="Choose from our list.."
          initialValue={this.props.subjects}
          label="Subjects"
        />
      </Form>
    );
  }
}

const mapStateToProps = (state: State) => ({
  subjectsInStore: state.subjects,
});

export default connect(mapStateToProps)(
  Form.create<Props>()(CollectionEditForm),
);
