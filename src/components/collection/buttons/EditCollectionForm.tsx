import { Checkbox, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { connect } from 'react-redux';
import { AgeRange } from '../../../types/AgeRange';
import State from '../../../types/State';
import { SubjectsForm } from '../../account/form/SubjectsForm';
import AgeRangeSlider from '../../common/AgeRangeSlider';
import './EditCollectionForm.less';

export interface EditableFields {
  title: string;
  isPublic: boolean;
  subjects: string[];
  ageRange: AgeRange;
  description: string;
}

type Props = EditableFields & FormComponentProps;

class EditCollectionForm extends React.PureComponent<
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
              ageRange={this.props.ageRange}
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
        <Form.Item className="form__item" label="Description">
          {getFieldDecorator('description', {
            initialValue: this.props.description,
          })(
            <TextArea
              data-qa="description-edit"
              rows={3}
              placeholder="Enter a brief overview of the topic of your collection"
              className="form__item__textarea"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state: State) => ({
  subjectsInStore: state.subjects,
});

export default connect(mapStateToProps)(
  Form.create<Props>()(EditCollectionForm),
);
