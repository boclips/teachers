import React from 'react';
import { PrivacyPolicyLink } from '../account/form/PrivacyPolicyLink';
import { TermsAndConditionsLink } from '../account/form/TermsAndConditionsLink';
import './BoclipsFooter.less';

export class BoclipsFooter extends React.PureComponent {
  public render() {
    return (
      <footer className="boclips-footer ant-layout-content">
        <p>
          Copyright © {new Date().getFullYear()} Boclips. All rights reserved.{' '}
          <span className={'boclips-footer__links'}>
            <TermsAndConditionsLink />
            &nbsp;•&nbsp;
            <PrivacyPolicyLink />
          </span>
        </p>
        <p>
          All trademarks, service marks, trade names, product names and logos
          appearing on the site are the property of their respective owners. Any
          rights not expressly granted herein are reserved.
        </p>
      </footer>
    );
  }
}
