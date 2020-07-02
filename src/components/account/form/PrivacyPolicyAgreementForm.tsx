import { Form } from '@ant-design/compatible';
import { Checkbox } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import BlankTargetLink from '../../common/BlankTargetLink';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';

export class PrivacyPolicyAgreementForm extends React.Component<
  FormComponentProps
> {
  public render() {
    return (
      <Form.Item>
        {this.props.form.getFieldDecorator('privacyPolicy', {
          rules: [
            {
              required: true,
              transform: (value) => value || undefined,
              type: 'boolean',
              message:
                'In order to use our services, you need to agree with the T&C and privacy policy.',
            },
          ],
        })(
          <Checkbox
            className="create-account-form__checkbox"
            data-qa="privacy-policy"
            aria-required={true}
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
          </Checkbox>,
        )}
      </Form.Item>
    );
  }
}
