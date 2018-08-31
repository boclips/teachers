import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import fetchLinks from '../links/fetchLinks';
import {Links} from '../links/VideoLinks';
import {actionCreatorFactory} from '../redux/actions';
import {LinksState} from '../State';

interface Props {
  loadingComponent: React.ComponentType;
  configHasBeenLoaded: boolean;
  requestConfig: () => void;
}

export const storeLinksAction = actionCreatorFactory<Links>('STORE_LINKS');

class ConfigLoader extends React.PureComponent<Props> {

  componentDidMount(): void {
    this.props.requestConfig();
  }

  render() {
    if (this.props.configHasBeenLoaded) {
      return this.props.children;
    }

    const LoadingComponent = this.props.loadingComponent;
    return <LoadingComponent/>;
  }
}

function mapStateToProps(state: LinksState) {
  return {
    configHasBeenLoaded: !!state.links,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    requestConfig: () => fetchLinks().then(storeLinksAction).then(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigLoader);