import { Checkbox, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

interface Props {
  title: string;
  isPublic: boolean;
}

class CollectionEditForm extends React.PureComponent<
  Props & FormComponentProps
> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('title')(<Input data-qa="title-edit" />)}
        </Form.Item>
        <Form.Item>
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

export default Form.create<Props>({
  mapPropsToFields(props: Props) {
    return {
      title: Form.createFormField({ value: props.title }),
      isPublic: Form.createFormField({ value: props.isPublic }),
    };
  },
})(CollectionEditForm);
