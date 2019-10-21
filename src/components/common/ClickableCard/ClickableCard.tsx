import { Card } from 'antd';
import { CardProps } from 'antd/es/card';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

export interface Props extends CardProps, RouteComponentProps {
  href: string;
}

export class ClickableCardForRouter extends React.PureComponent<Props> {
  public render() {
    const { href, history, location, staticContext, ...cardProps } = this.props;

    return <Card onClick={this.handleOnClick} {...cardProps} />;
  }

  private handleOnClick = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(this.props.href);
    } else {
      this.props.history.push(this.props.href);
    }
  };
}

export const ClickableCard = withRouter(ClickableCardForRouter);
