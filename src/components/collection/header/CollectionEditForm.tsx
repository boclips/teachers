import { Checkbox, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import './CollectionEditForm.less';

export interface EditableFields {
  title: string;
  isPublic: boolean;
}

export interface OwnProps extends EditableFields {
  canSave: boolean;
}

class CollectionEditForm extends React.PureComponent<
  OwnProps & FormComponentProps
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
      </Form>
    );
  }
}

export default Form.create<EditableFields>()(CollectionEditForm);
