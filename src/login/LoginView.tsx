import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import boclipsLogo from '../images/boclips-logo.png';
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
      <section data-qa="login-page" className={'login-form'}>
        <Row>
          <Col
            className="centered"
            xs={{ offset: 1, span: 20 }}
            md={{ offset: 8, span: 8 }}
            xl={{ offset: 9, span: 6 }}
          >
            <img className="login-logo" src={boclipsLogo} />
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ offset: 1, span: 20 }}
            md={{ offset: 8, span: 8 }}
            xl={{ offset: 9, span: 6 }}
          >
            <hr />
            <p className="login-details">
              If you’d like to try our video search but don’t have login details
              contact us
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ offset: 1, span: 20 }}
            md={{ offset: 8, span: 8 }}
            xl={{ offset: 9, span: 6 }}
          >
            <LoginForm
              onSubmit={this.props.onSubmit(this.props.redirectPath)}
            />
            {this.props.invalidCredentials && (
              <div data-qa="wrong-credentials-alert">Invalid credentials</div>
            )}
          </Col>
        </Row>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onSubmit: redirectPath => userCredentials => {
      const headers = {
        // TODO centralise auth
        Authorization:
          'Basic ' +
          btoa(userCredentials.username + ':' + userCredentials.password),
      };
      fetch('/v1/user', { headers }) // TODO use links
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
