import BoclipsSecurity from 'boclips-js-security';
import { Store } from 'redux';
import { Constants } from 'src/app/AppConstants';
import { AuthenticateOptions } from 'boclips-js-security/dist/BoclipsSecurity';
import { failedAuthentication } from 'src/app/redux/authentication/actions/failedAuthentication';
import { requestAuthenticationCheck } from 'src/app/redux/authentication/actions/requestAuthenticationCheck';
import { sideEffect } from '../../actions';
import { successfulAuthentication } from '../actions/successfulAuthentication';
import { authenticationRequired } from '../actions/authenticationRequired';
import { authenticationRequiredFirstTime } from '../actions/authenticationRequiredFirstTime';
import { requestSsoAuthentication } from '../actions/requestSsoAuthentication';

const createBoclipsSecurityInstance = (
  store: Store,
  customOptions?: Partial<AuthenticateOptions>,
) =>
  BoclipsSecurity.createInstance({
    realm: 'boclips',
    clientId: 'teachers',
    authEndpoint: Constants.AUTH_ENDPOINT,
    requireLoginPage: false,
    onLogin: () => store.dispatch(successfulAuthentication()),
    onFailure: () => store.dispatch(failedAuthentication()),
    ...customOptions,
  });

const onAuthenticationRequired = (store: Store) =>
  createBoclipsSecurityInstance(store, { requireLoginPage: true });

const onAuthenticationCheckRequested = (store: Store) =>
  createBoclipsSecurityInstance(store);

export interface SignUpOptions {
  username: string;
  password: string;
}
const onAuthenticationRequiredFirstTime = (
  store: Store,
  options: SignUpOptions,
) =>
  createBoclipsSecurityInstance(store, {
    checkLoginIframe: false,
    username: options.username,
    password: options.password,
  });

const onSsoAuthenticationRequested = (
  store: Store,
  identityProvider: string,
) => {
  const boclipsSecurity = createBoclipsSecurityInstance(store);

  boclipsSecurity.ssoLogin({
    idpHint: identityProvider,
    redirectUri: Constants.HOST,
  });
};

export default [
  sideEffect(authenticationRequired, onAuthenticationRequired),
  sideEffect(
    authenticationRequiredFirstTime,
    onAuthenticationRequiredFirstTime,
  ),
  sideEffect(requestAuthenticationCheck, onAuthenticationCheckRequested),
  sideEffect(requestSsoAuthentication, onSsoAuthenticationRequested),
];
