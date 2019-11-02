import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import { AuthenticationState, LinksState } from '../../types/State';
import { requestAuthentication } from '../redux/authentication/actions/requestAuthentication';
import { fetchLinksAction } from '../redux/links/actions/fetchLinksAction';

interface StateProps {
  linksHaveLoaded: boolean;
  authenticationResolved: boolean;
}

interface DispatchProps {
  fetchLinks: () => void;
}

type Props = StateProps & DispatchProps;

export class UnconnectedLinkLoader extends React.PureComponent<Props> {
  public componentDidMount(): void {
    if (this.props.authenticationResolved) {
      this.props.fetchLinks();
    }
  }

  public componentDidUpdate(prevProps: Props): void {
    if (
      !this.props.linksHaveLoaded &&
      this.props.authenticationResolved &&
      prevProps.authenticationResolved !== this.props.authenticationResolved
    ) {
      this.props.fetchLinks();
    }
  }

  public render() {
    if (!this.props.linksHaveLoaded) {
      return <LoadingComponent />;
    }

    return this.props.children;
  }
}

const mapStateToProps = (
  state: LinksState & AuthenticationState,
): StateProps => ({
  linksHaveLoaded: !!state.links,
  authenticationResolved:
    state.authentication && state.authentication.status !== null,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchLinks: () => dispatch(fetchLinksAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedLinkLoader);
