import { Checkbox, Form } from 'antd';
import React from 'react';
import BlankTargetLink from '../../common/BlankTargetLink';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';

interface Props {
  formItemId: string;
}
export const PrivacyPolicyAgreementForm = (props: Props) => {
  return (
    <Form.Item
      name={props.formItemId}
      className="required form__item"
      rules={[
        {
          required: true,
          transform: (value) => value || undefined,
          type: 'boolean',
          message:
            'In order to use our services, you need to agree with the T&C and privacy policy.',
        },
      ]}
      valuePropName="checked"
    >
      <Checkbox
        className="create-account-form__checkbox create-account-form__condition"
        data-qa="privacy-policy"
        aria-required
      >
        I have read and agree with the Boclips{' '}
        <BlankTargetLink
          className="create-account-form__checkbox-link"
          href="https://www.boclips.com/terms-and-conditions"
        >
          Terms and Conditions
        </BlankTargetLink>
        . Boclips will collect and process data as described in the{' '}
        <PrivacyPolicyLink />.
      </Checkbox>
    </Form.Item>
  );
};
