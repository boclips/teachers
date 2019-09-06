import React from 'react';
import DownArrowSvg from '../../../../resources/images/down-arrow.svg';
import UpArrowSvg from '../../../../resources/images/up-arrow.svg';

interface Props {
  active: boolean;
}

class DropdownArrow extends React.PureComponent<Props> {
  public render() {
    console.log(`rendering arrow active: ${this.props.active}`);
    return this.props.active ? <DownArrowSvg /> : <UpArrowSvg />;
  }
}

export default DropdownArrow;
