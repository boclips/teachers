import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter,
} from 'react-router-dom';
import { Dispatch } from 'redux';
import { requestAuthentication } from '../../app/redux/authentication/actions/requestAuthentication';
import { AuthenticationState, UserState } from '../../types/State';

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
  authenticated: boolean;
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
    const { authenticated, component, children, ...rest } = props;
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

      if (!authenticated) {
        return null;
      }

      if (component) {
        return React.createElement(component, props);
      }

      return children;
    }
  }

  public componentDidMount(): void {
    if (!this.props.authenticated) {
      this.props.authenticate();
    }
  }
}

function mapStateToProps(state: AuthenticationState & UserState): StateProps {
  return {
    authenticated:
      state.authentication.status === 'authenticated' &&
      /**
       * TODO: It would be nice to move the dependencies on these state properties to the component using it, in order
       * to make a better experience and make the site appear faster. Spinners. Caution: this will lead to a jumpy
       * layout if not managed correctly with placeholder/skeletons
       */
      !!state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    authenticate: () => {
      dispatch(requestAuthentication({ authenticationRequired: true }));
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute),
);
