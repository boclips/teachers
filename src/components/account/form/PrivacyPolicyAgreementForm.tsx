import { Checkbox, Form } from 'antd';
import React from 'react';
import BlankTargetLink from '../../common/BlankTargetLink';
import { FormComponentProps } from './FormComponentProps';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';

export class PrivacyPolicyAgreementForm extends React.Component<
  FormComponentProps
> {
  public render() {
    return (
      <Form.Item>
        {this.props.form.getFieldDecorator('privacy_policy', {
          rules: [
            {
              required: true,
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
