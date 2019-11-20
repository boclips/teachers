import classnames from 'classnames';
import React from 'react';
import { Row } from 'antd';

import './Grid.less';

interface Props {
  className?: string;
}

export class FiniteGrid extends React.PureComponent<Props> {
  public render() {
    return (
      <Row
        className={classnames('boclips-grid', this.props.className)}
        type="flex"
        gutter={[20, 20]}
      >
        {this.props.children}
      </Row>
    );
  }
}
