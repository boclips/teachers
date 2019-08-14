import BoclipsSecurity from 'boclips-js-security';
import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter,
} from 'react-router-dom';
import { Dispatch } from 'redux';
import { authenticationChanged } from '../../app/redux/authentication/actions/authenticationChanged';
import { UserState } from '../../types/State';
import { defaultAuthEndpoint } from './authEndpoint';

export interface PrivateRouteComponentProps<TParams>
  extends RouteComponentProps<any> {
  computedMatch: {
    params: TParams;
  };
}

interface Props {
  component?:
    | ComponentType<PrivateRouteComponentProps<any>>
    | ComponentType<any>;
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

function mapStateToProps(state: UserState): StateProps {
  return {
    authorized: state.user && state.user.authenticated,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    authenticate: () => {
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
        authEndpoint: defaultAuthEndpoint,
      });
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute),
);
