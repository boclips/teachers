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
import {
  AuthenticationState,
  AuthenticationStateValue,
  UserState,
} from '../../types/State';

export interface ConditionalRouteComponentParams<TParams>
  extends RouteComponentProps<any> {
  computedMatch: {
    params: TParams;
  };
}

interface OwnProps {
  component?:
    | ComponentType<ConditionalRouteComponentParams<any>>
    | ComponentType<any>;
  shouldRenderChildren?: (state: AuthenticationState & UserState) => boolean;
  canBeAnonymous: boolean;
}

interface StateProps {
  canRenderComponent: boolean;
}

interface DispatchProps {
  authenticate: () => void;
}

class ConditionalRoute extends React.Component<
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
        'Either component or children should be defined in ConditionalRoute',
      );
    }

    if (component && children) {
      throw Error(
        'Only component or children should be defined in ConditionalRoute but not both',
      );
    }

    if (!canRenderComponent) {
      // TODO: Render a spinner/loader/placeholder
      return null;
    }

    if (component) {
      return React.createElement(component, this.props);
    }

    return children;
  };

  public componentDidMount(): void {
    if (!this.props.canRenderComponent) {
      this.props.authenticate();
    }
  }
}

function mapStateToProps(
  state: AuthenticationState & UserState,
  ownProps: OwnProps,
): StateProps {
  const validAuthenticationStates: Array<AuthenticationStateValue['status']> = [
    'authenticated',
  ];

  if (ownProps.canBeAnonymous) {
    validAuthenticationStates.push('anonymous');
  }

  const shouldRenderChildren = ownProps.shouldRenderChildren || (() => true);

  return {
    canRenderComponent:
      state.authentication &&
      validAuthenticationStates.indexOf(state.authentication.status) !== -1 &&
      shouldRenderChildren(state),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    authenticate: () => {
      dispatch(
        requestAuthentication({
          authenticationRequired: ownProps.canBeAnonymous === false,
        }),
      );
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ConditionalRoute),
);
