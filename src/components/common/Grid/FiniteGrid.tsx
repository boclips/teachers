import { RowProps } from 'antd/es/row';
import classnames from 'classnames';
import React from 'react';
import { Row } from 'antd';

import './Grid.less';

interface Props {
  className?: string;
  gutter?: RowProps['gutter'];
}

export class FiniteGrid extends React.PureComponent<Props> {
  public static defaultProps = {
    gutter: [20, 20],
  };

  public render() {
    return (
      <Row
        className={classnames('boclips-grid', this.props.className)}
        gutter={this.props.gutter}
      >
        {this.props.children}
      </Row>
    );
  }
}
