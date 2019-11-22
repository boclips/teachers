import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { clearSearchFilterParametersAction } from '../redux/actions/clearSearchFilterParametersAction';
import './ClearAllButton.less';

interface DispatchProps {
  onClick: () => void;
}

class ClearAllButton extends React.Component<DispatchProps> {
  public render() {
    return (
      <Button className="clear-all-button" onClick={this.props.onClick}>
        Clear all
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClick: () => dispatch(clearSearchFilterParametersAction()),
});

export default connect(null, mapDispatchToProps)(ClearAllButton);
