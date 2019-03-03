import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React from 'react';

declare type Props = { 'data-qa': string } & ButtonProps;
// https://codepen.io/scottloway/pen/zqoLyQ
export default class SavingButton extends React.PureComponent<Props> {
  public render() {
    return <Button {...this.props}>{this.props.children}</Button>;
  }
}
