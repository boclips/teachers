import React from 'react';
import MyAccountImg from '../../../../resources/images/my-account.svg';
import NavbarButton from '../navigation/NavbarButton';

interface Props {
  onClick?: () => void;
}

const AccountMenuIconComponent = React.memo((props: Props) => (
  <NavbarButton
    onClick={props.onClick}
    icon={<MyAccountImg />}
    label={'My account'}
    data-qa="account-menu-open"
    aria-label="My account menu"
    aria-haspopup="true"
  />
));

export default AccountMenuIconComponent;
