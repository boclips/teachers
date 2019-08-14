import BoclipsSecurity from 'boclips-js-security';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authenticationChanged } from '../../app/redux/authentication/actions/authenticationChanged';
import { UserState } from '../../types/State';
import { defaultAuthEndpoint } from './authEndpoint';

interface StateProps {
  authorized: boolean;
}

interface DispatchProps {
  authenticateIfLoggedIn: () => void;
}

class LoginProvider extends React.Component<StateProps & DispatchProps> {
  public render(): React.ReactNode {
    const { children } = this.props;
    return children;
  }

  public componentDidMount(): void {
    if (!this.props.authorized) {
      this.props.authenticateIfLoggedIn();
    }
  }
}

function mapStateToProps(state: UserState): StateProps {
  return {
    authorized: state.user && state.user.authenticated,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    authenticateIfLoggedIn: () => {
      BoclipsSecurity.createInstance({
        onLogin: keycloak => {
          dispatch(
            authenticationChanged({
              keycloakInstance: keycloak,
              success: true,
            }),
          );
        },
        onFailure: () => {
          dispatch(
            authenticationChanged({
              success: false,
            }),
          );
        },
        realm: 'boclips',
        clientId: 'teachers',
        mode: 'check-sso',
        authEndpoint: defaultAuthEndpoint,
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginProvider);
