import React from 'react';
import { Button } from 'antd';
import './ButtonRow.less';

interface Props {
  buttons: React.ReactNode;
}

export class ButtonRow extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="button-row">
        <Button.Group>{this.props.buttons}</Button.Group>
      </section>
    );
  }
}
