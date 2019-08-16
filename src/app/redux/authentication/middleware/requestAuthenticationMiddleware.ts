import BoclipsSecurity from 'boclips-js-security';
import { Store } from 'redux';
import { sideEffect } from '../../actions';
import { authenticationResolved } from '../actions/authenticationResolved';
import { requestAuthentication } from '../actions/requestAuthentication';

const defaultAuthEndpoint =
  process.env.ENVIRONMENT_DOMAIN &&
  `https://login.${process.env.ENVIRONMENT_DOMAIN}/auth`;

const onAuthenticationRequested = (
  store: Store,
  { authenticationRequired },
) => {
  BoclipsSecurity.createInstance({
    onLogin: () => {
      store.dispatch(
        authenticationResolved({
          success: true,
        }),
      );
    },
    onFailure: () => {
      store.dispatch(
        authenticationResolved({
          success: false,
        }),
      );
    },
    realm: 'boclips',
    clientId: 'teachers',
    mode: authenticationRequired ? 'login-required' : 'check-sso',
    authEndpoint: defaultAuthEndpoint,
  });
};

export default sideEffect(requestAuthentication, onAuthenticationRequested);