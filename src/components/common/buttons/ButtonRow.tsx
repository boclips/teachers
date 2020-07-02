import React from 'react';
import { Button } from 'antd';
import './ButtonRow.less';

interface Props {
  rightButtons?: React.ReactNode;
  leftButtons?: React.ReactNode;
}

export const ButtonRow = React.memo((props: Props) => (
  <section className="button-row">
    {props.leftButtons && <Button.Group>{props.leftButtons}</Button.Group>}
    {props.rightButtons && (
      <Button.Group className={'button-row__group--right'}>
        {props.rightButtons}
      </Button.Group>
    )}
  </section>
));
