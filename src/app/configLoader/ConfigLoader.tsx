import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LinksState } from '../../redux/State';
import { fetchLinksAction } from '../../services/links/redux/actions/fetchLinksAction';

interface Props {
  loadingComponent: React.ComponentType;
  configHasBeenLoaded: boolean;
  requestConfig: () => void;
}

class ConfigLoader extends React.PureComponent<Props> {
  public componentDidMount(): void {
    this.props.requestConfig();
  }

  public render() {
    if (this.props.configHasBeenLoaded) {
      return this.props.children;
    }

    const LoadingComponent = this.props.loadingComponent;
    return <LoadingComponent />;
  }
}

function mapStateToProps(state: LinksState) {
  return {
    configHasBeenLoaded: !!state.links,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    requestConfig: () => dispatch(fetchLinksAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigLoader);
