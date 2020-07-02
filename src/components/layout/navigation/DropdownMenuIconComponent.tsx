import React from 'react';
import { A11yButton } from '../../common/a11y/A11yButton';
import DropdownArrow from './DropdownArrow';

interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  dataQa: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const DropdownMenuIconComponent = (props: Props) => {
  return (
    <A11yButton callback={props.onClick}>
      <div
        className="navbar-buttons__button"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        data-qa={props.dataQa}
      >
        <span className="icon">{props.icon}</span>
        <span className="icon-label">
          {props.label}
          <span className="dropdown-arrow">
            <DropdownArrow active={props.active} />
          </span>
        </span>
      </div>
    </A11yButton>
  );
};

export default DropdownMenuIconComponent;
