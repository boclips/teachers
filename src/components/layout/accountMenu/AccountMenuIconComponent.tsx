import classnames from 'classnames';
import React from 'react';
import MyAccountSVG from '../../../../resources/images/my-account.svg';
import { A11yButton } from '../../common/A11yButton';

interface Props {
  onClick?: () => void;
  className?: string;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <A11yButton callback={props.onClick}>
    <div className={classnames('navbar-buttons__button', props.className)}>
      <MyAccountSVG
        className="account-menu-icon ant-dropdown-link"
        data-qa="account-menu-open"
        tabIndex={0}
        aria-haspopup="true"
        aria-hidden="true"
      />
      <span className={'icon-label'}>Your account</span>
    </div>
  </A11yButton>
));

export default AccountMenuIconComponent;
