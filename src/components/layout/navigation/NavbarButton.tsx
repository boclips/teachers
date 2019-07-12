import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  onClick?: () => void;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  link?: string;
  dataQa?: string;
}

class NavbarButton extends React.PureComponent<Props> {
  public render() {
    return (
      <Link
        to={this.props.link}
        className="navbar-buttons__button link--tabbable"
        tabIndex={0}
        data-qa={this.props.dataQa}
      >
        <>
          <span className={'icon-container'}>{this.isActive() && this.props.activeIcon || this.props.icon}</span>
          <span className={'icon-label'}>{this.props.label}</span>
        </>
      </Link>
    );
  }

  private isActive = () => {
    return this.props.location.pathname === this.props.link;
  }
};

export default withRouter(NavbarButton);
