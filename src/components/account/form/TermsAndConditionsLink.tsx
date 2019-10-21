import React from 'react';
import BlankTargetLink from '../../common/BlankTargetLink';

export class TermsAndConditionsLink extends React.Component {
  public render() {
    return (
      <BlankTargetLink
        className="create-account-form__checkbox-link"
        href="https://www.boclips.com/terms-and-conditions"
      >
        Terms & Conditions
      </BlankTargetLink>
    );
  }
}
