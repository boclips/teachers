import { authenticate as keycloakAuthenticate } from 'boclips-js-security';
import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter,
} from 'react-router-dom';
import { Dispatch } from 'redux';
import { LoginState } from '../../types/State';
import { storeLogin } from './redux/actions/storeLoginAction';

export interface RouterComponentProps<TParams>
  extends RouteComponentProps<any> {
  computedMatch: {
    params: TParams;
  };
}

interface Props {
  component?: ComponentType<RouterComponentProps<any>> | ComponentType<any>;
}

interface StateProps {
  authorized: boolean;
}

interface DispatchProps {
  authenticate: () => void;
}

class PrivateRoute extends React.Component<
  RouteComponentProps<{}> & RouteProps & Props & StateProps & DispatchProps,
  any
> {
  public render(): React.ReactNode {
    const props = this.props;
    const { authorized, component, children, ...rest } = props;
    return <Route {...rest} render={renderRoute} />;

    function renderRoute() {
      if (!component && !children) {
        throw Error(
          'Either component or children should be defined in PrivateRoute',
        );
      }

      if (component && children) {
        throw Error(
          'Only component or children should be defined in PrivateRoute but not both',
        );
      }

      if (!authorized) {
        return null;
      }

      if (component) {
        return React.createElement(component, props);
      }

      return children;
    }
  }

  public componentDidMount(): void {
    if (!this.props.authorized) {
      this.props.authenticate();
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
    authenticate: () => {
      keycloakAuthenticate(
        keycloak => {
          dispatch(storeLogin(keycloak));
        },
        'boclips',
        'teachers',
      );
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute),
);
