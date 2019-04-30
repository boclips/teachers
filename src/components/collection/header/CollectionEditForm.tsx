import { Checkbox, Form, Input } from 'antd';
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
}

export interface OwnProps extends EditableFields {
  canSave: boolean;
}

class CollectionEditForm extends React.PureComponent<
  OwnProps & ReturnType<typeof mapStateToProps> & FormComponentProps
> {
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
