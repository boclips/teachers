import classnames from 'classnames';
import React from 'react';

interface Props {
  onClick?: () => void;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  icon: React.ReactNode;
  label: string;
  link?: string;
  dataQa?: string;
  className?: string;
}

export class NavbarButton extends React.PureComponent<Props> {
  public static defaultProps = {
    target: '',
  };

  public render() {
    return (
      <a
        tabIndex={-1}
        href={this.props.link}
        target={this.props.target}
        className={classnames('navbar-buttons__button', this.props.className)}
        data-qa={this.props.dataQa}
        onClick={this.props.onClick}
        role="button"
      >
        <React.Fragment>
          <span tabIndex={0} className={'icon'} aria-hidden={true}>
            {this.props.icon}
          </span>
          <span className={'icon-label'}>{this.props.label}</span>
        </React.Fragment>
      </a>
    );
  }
}
