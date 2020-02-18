import BoclipsSecurity from 'boclips-js-security';
import { Store } from 'redux';
import { Constants } from 'src/app/AppConstants';
import { sideEffect } from '../../actions';
import { authenticationResolved } from '../actions/authenticationResolved';
import { requestAuthentication } from '../actions/requestAuthentication';
import { requestSsoAuthentication } from '../actions/requestSsoAuthentication';

const defaultAuthEndpoint =
  process.env.ENVIRONMENT_DOMAIN &&
  `https://login.${process.env.ENVIRONMENT_DOMAIN}/auth`;

const onAuthenticationRequested = (
  store: Store,
  { authenticationRequired },
) => {
  BoclipsSecurity.createInstance({
    ...getDefaultSecurityOptions(store),
    mode: authenticationRequired ? 'login-required' : 'check-sso',
  });
};

const onSsoAuthenticationRequested = (
  store: Store,
  identityProvider: string,
) => {
  const boclipsSecurity = BoclipsSecurity.createInstance(
    getDefaultSecurityOptions(store),
  );

  boclipsSecurity.ssoLogin({
    idpHint: identityProvider,
    redirectUri: Constants.HOST,
  });
};

const getDefaultSecurityOptions = (store: Store) => ({
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
  authEndpoint: defaultAuthEndpoint,
});

export default [
  sideEffect(requestAuthentication, onAuthenticationRequested),
  sideEffect(requestSsoAuthentication, onSsoAuthenticationRequested),
];
