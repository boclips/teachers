import { Checkbox, Form } from 'antd';
import React from 'react';
import { FormComponentProps } from './FormComponentProps';
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
          <Checkbox className="create-account-form__checkbox">
            I want to receive marketing information about Boclips's similar
            products or services which may be of interest to me in accordance
            with the <PrivacyPolicyLink />.
          </Checkbox>,
        )}
      </Form.Item>
    );
  }
}
