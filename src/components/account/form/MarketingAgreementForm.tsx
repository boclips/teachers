import { Form } from '@ant-design/compatible';
import { Checkbox } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';

export const MarketingAgreementForm = (props: FormComponentProps) => {
  return (
    <Form.Item>
      {props.form.getFieldDecorator('hasOptedIntoMarketing', {
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
};
