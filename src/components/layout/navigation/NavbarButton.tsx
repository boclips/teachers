import React from 'react';
import { A11yButton } from '../../common/A11yButton';

interface Props {
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavbarButton = React.memo((props: Props) => {
  const { icon, label } = props;

  return (
    <A11yButton
      callback={props.onClick}
      className="ant-dropdown-link navbar-buttons__button"
      tabIndex={0}
      role="button"
      {...props}
    >
      <>
        {icon}
        <span className={'icon-label'}>{label}</span>
      </>
    </A11yButton>
  );
});

export default NavbarButton;
