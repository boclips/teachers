import React from 'react';
import MyAccountImg from '../../../../resources/images/my-account.svg';
import { A11yButton } from '../../common/A11yButton';

import './AccountMenuIconComponent.less';

interface Props {
  onClick?: () => void;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <A11yButton callback={props.onClick}>
    <MyAccountImg
      className="account-menu-icon ant-dropdown-link"
      data-qa="account-menu-open"
      tabIndex={0}
      role="button"
      aria-label="My account menu"
      aria-haspopup="true"
    />
  </A11yButton>
));

export default AccountMenuIconComponent;
