import React from 'react';
import myAccountImg from '../../../../resources/images/my-account.svg';

import './AccountMenuIconComponent.less';

interface Props {
  onClick?: () => void;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <img
    className="account-menu ant-dropdown-link"
    data-qa="account-menu-open"
    onClick={props.onClick}
    src={myAccountImg}
  />
));

export default AccountMenuIconComponent;
