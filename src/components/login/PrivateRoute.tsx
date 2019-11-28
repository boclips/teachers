import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter,
} from 'react-router-dom';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { requestAuthentication } from '../../app/redux/authentication/actions/requestAuthentication';
import { AuthenticationState, LinksState, UserState } from '../../types/State';
import { LoadingComponent } from '../common/LoadingComponent';

export interface PrivateRouteComponentParams<TParams>
  extends RouteComponentProps<any> {
  computedMatch: {
    params: TParams;
  };
}

interface OwnProps {
  component?:
    | ComponentType<PrivateRouteComponentParams<any>>
    | ComponentType<any>;
}

interface StateProps {
  canRenderComponent: boolean;
  isAuthenticated: boolean;
  accessExpired: boolean;
}

interface DispatchProps {
  authenticate: () => void;
  redirectToAccessRenewalPage: () => void;
}

class PrivateRoute extends React.Component<
  RouteComponentProps<{}> & RouteProps & OwnProps & StateProps & DispatchProps
> {
  public render(): React.ReactNode {
    const { canRenderComponent, component, children, ...rest } = this.props;

    return <Route {...rest} render={this.renderChild} />;
  }

  private renderChild = () => {
    const { canRenderComponent, component, children } = this.props;

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

    if (!canRenderComponent) {
      return <LoadingComponent />;
    }

    if (component) {
      return React.createElement(component, this.props);
    }

    return children;
  };

  public componentDidMount(): void {
    if (!this.props.isAuthenticated) {
      this.props.authenticate();
    }
    if (this.props.accessExpired) {
      this.props.redirectToAccessRenewalPage();
    }
  }
}

function mapStateToProps(
  state: LinksState & AuthenticationState & UserState,
): StateProps {
  return {
    isAuthenticated:
      state.authentication && state.authentication.status === 'authenticated',
    accessExpired: !!state.links.reportAccessExpired,
    canRenderComponent:
      state.authentication &&
      state.authentication.status === 'authenticated' &&
      !!state.user &&
      !state.links.reportAccessExpired,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    authenticate: () => {
      dispatch(requestAuthentication({ authenticationRequired: true }));
    },
    redirectToAccessRenewalPage: () => {
      dispatch(push('/trial-expired'));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateRoute),
);
