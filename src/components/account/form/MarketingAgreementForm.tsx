import { Checkbox, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';

export class MarketingAgreementForm extends React.Component<
  FormComponentProps
> {
  public render() {
    return (
      <Form.Item>
        {this.props.form.getFieldDecorator('hasOptedIntoMarketing', {
          rules: [],
          initialValue: false,
        })(
          <Checkbox
            className="create-account-form__checkbox"
            data-qa="marketing-optin"
          >
            I would like to receive marketing information about Boclips in
            accordance with the <PrivacyPolicyLink />.
          </Checkbox>,
        )}
      </Form.Item>
    );
  }
}
