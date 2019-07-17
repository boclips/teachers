import React from 'react';
import MyAccountSVG from '../../../../resources/images/my-account.svg';
import { A11yButton } from '../../common/A11yButton';

interface Props {
  onClick?: () => void;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <A11yButton callback={props.onClick}>
    <div className={'navbar-buttons__button'}>
      <MyAccountSVG
        className="account-menu-icon ant-dropdown-link"
        data-qa="account-menu-open"
        tabIndex={0}
        aria-haspopup="true"
        aria-hidden="true"
      />
      <span className={'icon-label'}>My account</span>
    </div>
  </A11yButton>
));

export default AccountMenuIconComponent;
