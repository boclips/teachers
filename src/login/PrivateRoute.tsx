import React, { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter,
} from 'react-router-dom';
import { UserState } from '../State';
import { UserCredentials } from './UserCredentials';

interface Props {
  user: UserCredentials;
  component: ComponentClass;
}

class PrivateRoute extends React.Component<
  RouteComponentProps<{}> & RouteProps & Props,
  any
> {
  public render(): React.ReactNode {
    const props = this.props;
    const { user, component, location, ...rest } = props;
    return <Route {...rest} render={renderRoute} />;

    function renderRoute() {
      if (!user || !user.valid) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location,
              },
            }}
          />
        );
      }

      return React.createElement(component, props);
    }
  }
}

export default withRouter(
  connect(
    (state: UserState) => ({ user: state.user }),
    {},
  )(PrivateRoute),
);
