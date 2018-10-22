import { authenticate as keycloakAuthenticate } from 'boclips-js-security';
import { KeycloakInstance } from 'keycloak-js';
import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter,
} from 'react-router-dom';
import { Dispatch, Reducer } from 'redux';
import { actionCreatorFactory } from '../redux/actions';
import createReducer, { actionHandler } from '../redux/createReducer';
import { LoginState } from '../State';

export interface RouterComponentProps<TParams>
  extends RouteComponentProps<any> {
  computedMatch: {
    params: TParams;
  };
}

interface Props {
  component: ComponentType<RouterComponentProps<any>> | ComponentType<any>;
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
    const { authorized, component, ...rest } = props;
    return <Route {...rest} render={renderRoute} />;

    function renderRoute() {
      if (!authorized) {
        return null;
      }

      return React.createElement(component, props);
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
    authorized: state.login && state.login.authenticated,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    authenticate: () => {
      keycloakAuthenticate(
        keycloak => {
          dispatch(storeLogin(keycloak));
        },
        'teachers',
        'teachers-ui',
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

export const storeLogin = actionCreatorFactory<KeycloakInstance>('STORE_LOGIN');

export const loginReducer: Reducer<KeycloakInstance> = createReducer(
  null,
  actionHandler(storeLogin, (_, login) => login),
);
