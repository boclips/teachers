import React from 'react';
import MyAccountImg from '../../../../resources/images/my-account.svg?react';

import './AccountMenuIconComponent.less';

interface Props {
  onClick?: () => void;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <MyAccountImg
    className="account-menu-icon ant-dropdown-link"
    data-qa="account-menu-open"
    onClick={props.onClick}
  />
));

export default AccountMenuIconComponent;
