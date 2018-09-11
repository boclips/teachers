import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../redux/actions';
import LoginForm from './LoginForm';
import { UserCredentials } from './UserCredentials';

export const loginUser = actionCreatorFactory<UserCredentials>('LOGIN_USER');

interface DispatchProps {
  onSubmit: (redirectPath: string) => (credentials: UserCredentials) => void;
}

interface Props {
  redirectPath: string;
}

class LoginComponent extends React.PureComponent<Props & DispatchProps> {
  public render(): React.ReactNode {
    return (
      <section data-qa="login-page">
        <LoginForm onSubmit={this.props.onSubmit(this.props.redirectPath)} />
      </section>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onSubmit: redirectPath => userCredentials => {
      dispatch(loginUser(userCredentials));
      dispatch(push(redirectPath || '/'));
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(LoginComponent);
