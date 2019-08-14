import React from 'react';
import { A11yButton } from '../../common/A11yButton';

interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  className?: string;
  dataQa: string;
  icon: React.ReactNode;
  label: string;
}

const DropdownMenuIconComponent = React.memo((props: Props) => (
  <A11yButton callback={props.onClick}>
    <div
      className={'navbar-buttons__button'}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      data-qa={props.dataQa}
    >
      {props.icon}
      <span className={'icon-label'}>{props.label}</span>
    </div>
  </A11yButton>
));

export default DropdownMenuIconComponent;
