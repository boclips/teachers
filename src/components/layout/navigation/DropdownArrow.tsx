import React from 'react';
import DownArrowSvg from 'resources/images/down-arrow.svg';
import UpArrowSvg from 'resources/images/up-arrow.svg';

interface Props {
  active: boolean;
}

class DropdownArrow extends React.PureComponent<Props> {
  public render() {
    return this.props.active ? <UpArrowSvg /> : <DownArrowSvg />;
  }
}

export default DropdownArrow;
