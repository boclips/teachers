import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import axios from 'axios';
import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import boclipsLogo from '../images/boclips-logo.png';
import { Link } from '../links/Link';
import { actionCreatorFactory } from '../redux/actions';
import { LinksState, RouterState, UserState } from '../State';
import getPreviousPath from './getPreviousPath';
import LoginForm from './LoginForm';
import { UserCredentials } from './UserCredentials';

export const loginUser = actionCreatorFactory<UserCredentials>('LOGIN_USER');

interface DispatchProps {
  onSubmit: (
    redirectPath: string,
    userLink: Link,
  ) => (credentials: UserCredentials) => void;
}

interface StateProps {
  redirectPath: string;
  invalidCredentials: boolean;
  userLink: Link;
}

class LoginComponent extends React.PureComponent<StateProps & DispatchProps> {
  public render(): React.ReactNode {
    return (
      <section data-qa="login-page" className={'login-form'}>
        <Row>
          <Col
            className="centered"
            xs={{ span: 24 }}
            md={{ offset: 6, span: 12 }}
            xl={{ offset: 9, span: 6 }}
          >
            <img className="login-logo" src={boclipsLogo} />
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 24 }}
            md={{ offset: 6, span: 12 }}
            xl={{ offset: 9, span: 6 }}
          >
            <hr />
            <p className="login-details">
              If you’d like to try our video search but don’t have login
              details&nbsp;
              <a href="mailto:contact@boclips.com?subject=I would like to join the Boclips teacher pilot">
                contact us
              </a>
              .
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 24 }}
            md={{ offset: 6, span: 12 }}
            xl={{ offset: 9, span: 6 }}
          >
            <LoginForm
              onSubmit={this.props.onSubmit(
                this.props.redirectPath,
                this.props.userLink,
              )}
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
    onSubmit: (redirectPath, userLink) => userCredentials => {
      axios
        .get(userLink.getLink(), {
          auth: {
            username: userCredentials.username,
            password: userCredentials.password,
          },
        })
        .then(_ => {
          dispatch(loginUser({ valid: true, ...userCredentials }));
          dispatch(push(redirectPath || '/'));
        })
        .catch(_ => {
          dispatch(loginUser({ valid: false, ...userCredentials }));
        });
    },
  };
}

function mapStateToProps(
  state: UserState & LinksState & RouterState,
): StateProps {
  return {
    redirectPath: getPreviousPath(state.router.location.state),
    invalidCredentials: state.user && !state.user.valid,
    userLink: state.links.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
