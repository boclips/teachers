import React from 'react';
import myAccountImg from '../../../../resources/images/my-account.svg';

interface Props {
  onClick?: () => void;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <img
    className="ant-dropdown-link"
    data-qa="account-menu-open"
    onClick={props.onClick}
    src={myAccountImg}
  />
));

export default AccountMenuIconComponent;
