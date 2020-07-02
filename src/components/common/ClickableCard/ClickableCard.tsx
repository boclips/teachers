import { Card } from 'antd';
import { CardProps } from 'antd/es/card';
import c from 'classnames';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import './ClickableCard.less';

export interface Props extends CardProps, RouteComponentProps {
  href: string;
}

export class ClickableCardForRouter extends React.PureComponent<Props> {
  private handleOnClick = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(this.props.href);
    } else {
      this.props.history.push(this.props.href);
    }
  };

  public render() {
    const { href, history, location, staticContext, ...cardProps } = this.props;

    return (
      <Card
        onClick={this.handleOnClick}
        /* eslint-disable-next-line */
        {...cardProps}
        className={c('clickable-card', this.props.className)}
      />
    );
  }
}

export const ClickableCard = withRouter(ClickableCardForRouter);
