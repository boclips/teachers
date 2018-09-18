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
import { LinksState, UserState } from '../State';
import LoginForm from './LoginForm';
import { UserCredentials } from './UserCredentials';

export const loginUser = actionCreatorFactory<UserCredentials>('LOGIN_USER');

interface DispatchProps {
  onSubmit: (
    redirectPath: string,
    userLink: Link,
  ) => (credentials: UserCredentials) => void;
}

interface Props {
  redirectPath: string;
}

interface StateProps {
  invalidCredentials: boolean;
  userLink: Link;
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

function mapStateToProps(state: UserState & LinksState): StateProps {
  return {
    invalidCredentials: state.user && !state.user.valid,
    userLink: state.links.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
