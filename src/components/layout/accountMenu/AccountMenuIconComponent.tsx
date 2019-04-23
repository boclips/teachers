import React from 'react';
import myAccountImg from '../../../../resources/images/my-account.svg';

import './AccountMenuIconComponent.less';

interface Props {
  onClick?: () => void;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <img
    className="account-menu-icon ant-dropdown-link"
    data-qa="account-menu-open"
    onClick={props.onClick}
    src={myAccountImg}
    alt="My account menu"
    tabIndex={0}
    role="button"
    aria-label="My account menu"
  />
));

export default AccountMenuIconComponent;
