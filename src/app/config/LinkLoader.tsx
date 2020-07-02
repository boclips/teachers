import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import {
  AuthenticationState,
  LinksState,
  LinksStateValue,
} from '../../types/State';
import { requestAuthentication } from '../redux/authentication/actions/requestAuthentication';
import { fetchLinksAction } from '../redux/links/actions/fetchLinksAction';
import { ErrorView } from '../../views/error/ErrorView';

interface StateProps {
  links: LinksStateValue;
  authenticationResolved: boolean;
}

interface DispatchProps {
  requestAuthentication: () => void;
  fetchLinks: () => void;
}

type Props = StateProps & DispatchProps & { children: any };

export class UnconnectedLinkLoader extends React.PureComponent<Props> {
  public componentDidMount(): void {
    if (this.props.authenticationResolved) {
      this.props.fetchLinks();
    } else {
      this.props.requestAuthentication();
    }
  }

  public componentDidUpdate(prevProps: Props): void {
    if (
      this.linksNotLoaded() &&
      this.props.authenticationResolved &&
      prevProps.authenticationResolved !== this.props.authenticationResolved
    ) {
      this.props.fetchLinks();
    }
  }

  public render() {
    if (this.linksNotLoaded()) {
      return <LoadingComponent />;
    }

    if (this.props.links.loadingState === 'failure') {
      return <ErrorView nonRecoverable={true} />;
    }

    return this.props.children;
  }

  private linksNotLoaded(): boolean {
    return (
      !this.props.links ||
      this.props.links.loadingState === null ||
      this.props.links.loadingState === 'loading'
    );
  }
}

const mapStateToProps = (
  state: LinksState & AuthenticationState,
): StateProps => ({
  links: state.links,
  authenticationResolved:
    state.authentication && state.authentication.status !== null,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestAuthentication: () =>
    dispatch(requestAuthentication({ authenticationRequired: false })),
  fetchLinks: () => dispatch(fetchLinksAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedLinkLoader);
