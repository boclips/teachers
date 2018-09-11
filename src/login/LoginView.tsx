import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../redux/actions';
import { UserState } from '../State';
import LoginForm from './LoginForm';
import { UserCredentials } from './UserCredentials';

export const loginUser = actionCreatorFactory<UserCredentials>('LOGIN_USER');

interface DispatchProps {
  onSubmit: (redirectPath: string) => (credentials: UserCredentials) => void;
}

interface Props {
  redirectPath: string;
}

interface StateProps {
  invalidCredentials: boolean;
}

class LoginComponent extends React.PureComponent<
  Props & StateProps & DispatchProps
> {
  public render(): React.ReactNode {
    return (
      <section data-qa="login-page">
        <LoginForm onSubmit={this.props.onSubmit(this.props.redirectPath)} />
        {this.props.invalidCredentials && (
          <div data-qa="wrong-credentials-alert">Invalid credentials</div>
        )}
      </section>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onSubmit: redirectPath => userCredentials => {
      fetch('/v1/user') // use links
        .then(response => {
          const ok = response.status < 400;
          if (ok) {
            dispatch(loginUser({ valid: true, ...userCredentials }));
            dispatch(push(redirectPath || '/'));
          } else {
            dispatch(loginUser({ valid: false, ...userCredentials }));
          }
        });
    },
  };
}

function mapStateToProps(state: UserState): StateProps {
  return {
    invalidCredentials: state.user && !state.user.valid,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
