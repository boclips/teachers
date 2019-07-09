import BoclipsSecurity from 'boclips-js-security';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginState } from '../../types/State';
import { defaultAuthEndpoint } from './authEndpoint';
import { userLoggedIn } from './redux/actions/userLoggedIn';

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

function mapStateToProps(state: LoginState): StateProps {
  return {
    authorized: state.user && state.user.authenticated,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    authenticateIfLoggedIn: () => {
      BoclipsSecurity.createInstance({
        onLogin: keycloak => {
          dispatch(userLoggedIn(keycloak));
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
