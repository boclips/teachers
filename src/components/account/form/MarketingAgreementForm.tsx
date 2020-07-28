import { Checkbox, Form } from 'antd';
import React from 'react';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';

interface Props {
  formItemId: string;
}
export const MarketingAgreementForm = (props: Props) => {
  return (
    <Form.Item name={props.formItemId} valuePropName="checked">
      <Checkbox
        className="create-account-form__checkbox"
        data-qa="marketing-optin"
      >
        I would like to receive marketing information about Boclips in
        accordance with the <PrivacyPolicyLink />.
      </Checkbox>
    </Form.Item>
  );
};
