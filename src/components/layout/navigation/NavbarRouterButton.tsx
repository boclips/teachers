import c from 'classnames';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  link?: string;
  dataQa?: string;
  className?: string;
}

class NavbarButton extends React.PureComponent<Props> {
  private isActive = () => this.props.location.pathname === this.props.link;

  public render() {
    return (
      <Link
        to={this.props.link}
        className={c(
          'navbar-buttons__link link--tabbable',
          this.props.className,
          {
            active: this.isActive(),
          },
        )}
        tabIndex={0}
        data-qa={this.props.dataQa}
        onClick={this.props.onClick}
      >
        <>
          <span className="icon-container" aria-hidden>
            {this.props.icon}
          </span>
          <span className="icon-label">{this.props.label}</span>
        </>
      </Link>
    );
  }
}

export const NavbarRouterButton = withRouter(NavbarButton);
