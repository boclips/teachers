import { authenticate as keycloakAuthenticate } from 'boclips-js-security';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginState } from '../../types/State';
import { storeLogin } from './redux/actions/storeLoginAction';

interface StateProps {
  authorized: boolean;
}

interface DispatchProps {
  authenticateIfLoggedIn: () => void;
}

class PrivateRoute extends React.Component<StateProps & DispatchProps> {
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
      keycloakAuthenticate(
        keycloak => {
          dispatch(storeLogin(keycloak));
        },
        'teachers',
        'teachers',
        'check-sso',
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);
