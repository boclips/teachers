import { Input } from 'antd';
import React from 'react';
import { FormComponentProps } from './FormComponentProps';
import TwoColumnInlineForm from './TwoColumnInlineFormItem';

export class NameForm extends React.Component<FormComponentProps> {
  public render() {
    return (
      <TwoColumnInlineForm
        leftColumn={this.props.form.getFieldDecorator('firstName', {
          rules: [
            {
              required: true,
              message: 'Please enter your first name',
            },
          ],
        })(
          <Input
            data-qa="first-name"
            size="large"
            placeholder="First name"
            className="create-account-form__first-name"
          />,
        )}
        rightColumn={this.props.form.getFieldDecorator('lastName', {
          rules: [
            {
              required: true,
              message: 'Please enter your last name',
            },
          ],
        })(
          <Input
            data-qa="last-name"
            size="large"
            placeholder="Last name"
            className="create-account-form__last-name"
          />,
        )}
      />
    );
  }
}