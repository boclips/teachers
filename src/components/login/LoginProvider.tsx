import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { requestAuthentication } from '../../app/redux/authentication/actions/requestAuthentication';
import { AuthenticationState } from '../../types/State';

interface StateProps {
  visible: boolean;
}

interface DispatchProps {
  authenticateIfLoggedIn: () => void;
}

class LoginProvider extends React.Component<StateProps & DispatchProps> {
  public render(): React.ReactNode {
    if (!this.props.visible) {
      return null;
    }

    return this.props.children;
  }

  public componentDidMount(): void {
    this.props.authenticateIfLoggedIn();
  }
}

function mapStateToProps(state: AuthenticationState): StateProps {
  return {
    visible: state.authentication.status !== 'pending',
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    authenticateIfLoggedIn: () => {
      dispatch(requestAuthentication({ authenticationRequired: false }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginProvider);
