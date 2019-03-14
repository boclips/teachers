import { Checkbox, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

export interface EditableFields {
  title: string;
  isPublic: boolean;
}

class CollectionEditForm extends React.PureComponent<
  EditableFields & FormComponentProps
> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="form">
        <Form.Item className="form__item">
          {getFieldDecorator('title')(<Input data-qa="title-edit" />)}
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

export default Form.create<EditableFields>({
  mapPropsToFields(props: EditableFields) {
    return {
      title: Form.createFormField({ value: props.title }),
      isPublic: Form.createFormField({ value: props.isPublic }),
    };
  },
})(CollectionEditForm);
