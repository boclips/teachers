import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { clearSearchFilterParametersAction } from '../redux/actions/clearSearchFilterParametersAction';
import './ClearAllButton.less';

interface DispatchProps {
  onClick: () => void;
}

const ClearAllButton = (props: DispatchProps) => (
  <Button className="clear-all-button" onClick={props.onClick}>
    Clear all
  </Button>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClick: () => dispatch(clearSearchFilterParametersAction()),
});

export default connect(null, mapDispatchToProps)(ClearAllButton);
