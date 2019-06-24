import React from 'react';

interface Props {
  children: React.ReactNode;
  wrapper?: 'div' | 'section';
  wrapperProps?: { [key: string]: any };
}

class StopClickPropagation extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    wrapper: 'div',
    wrapperProps: {},
  };

  private handleOnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  public render() {
    return React.createElement(this.props.wrapper, {
      ...this.props.wrapperProps,
      children: this.props.children,
      onClick: this.handleOnClick,
    });
  }
}
export default StopClickPropagation;
