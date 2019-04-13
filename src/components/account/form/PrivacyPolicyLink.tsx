import React from 'react';
import BlankTargetLink from '../../common/BlankTargetLink';

export class PrivacyPolicyLink extends React.Component {
  public render() {
    return (
      <BlankTargetLink
        className="create-account-form__checkbox-link"
        href="https://www.boclips.com/privacy-policy"
      >
        Privacy Policy
      </BlankTargetLink>
    );
  }
}
