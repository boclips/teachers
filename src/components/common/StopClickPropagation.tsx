import React from 'react';

interface Props {
  children: React.ReactNode;
  wrapper?: 'div' | 'section' | 'span';
  wrapperProps?: { [key: string]: any };
}

class StopClickPropagation extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    wrapper: 'div',
    wrapperProps: {},
  };

  private handleOnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  private handleOnKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.key === ' ' ||
      event.key === 'Enter' ||
      event.key === 'Spacebar'
    ) {
      event.stopPropagation();
    }
  };

  public render() {
    return React.createElement(this.props.wrapper, {
      ...this.props.wrapperProps,
      children: this.props.children,
      onClick: this.handleOnClick,
      onKeyDown: this.handleOnKeyDown,
    });
  }
}
export default StopClickPropagation;
