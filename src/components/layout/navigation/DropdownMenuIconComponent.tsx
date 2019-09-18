import React from 'react';
import { A11yButton } from '../../common/A11yButton';
import DropdownArrow from './DropdownArrow';

interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  className?: string;
  dataQa: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}
class DropdownMenuIconComponent extends React.Component<Props> {
  public render() {
    return (
      <A11yButton callback={this.props.onClick}>
        <div
          className={'navbar-buttons__button'}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          data-qa={this.props.dataQa}
        >
          <span className={'icon'}>{this.props.icon}</span>
          <span className={'icon-label'}>
            {this.props.label}
            <span className={'dropdown-arrow'}>
              <DropdownArrow active={this.props.active} />
            </span>
          </span>
        </div>
      </A11yButton>
    );
  }
}
export default DropdownMenuIconComponent;
