import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Links } from '../links/Links';
import {
  actionCreatorFactory,
  actionCreatorFactoryVoid,
} from '../redux/actions';
import { LinksState } from '../State';

interface Props {
  loadingComponent: React.ComponentType;
  configHasBeenLoaded: boolean;
  requestConfig: () => void;
}

export const storeLinksAction = actionCreatorFactory<Links>('STORE_LINKS');
export const fetchLinksAction = actionCreatorFactoryVoid('FETCH_LINKS');

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
