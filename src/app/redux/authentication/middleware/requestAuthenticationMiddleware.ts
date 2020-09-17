import BoclipsSecurity from 'boclips-js-security';
import { Store } from 'redux';
import { Constants } from 'src/app/AppConstants';
import { AuthenticateOptions } from 'boclips-js-security/dist/BoclipsSecurity';
import { failedAuthentication } from 'src/app/redux/authentication/actions/failedAuthentication';
import { requestAuthenticationCheck } from 'src/app/redux/authentication/actions/requestAuthenticationCheck';
import { sideEffect } from '../../actions';
import { successfulAuthentication } from '../actions/successfulAuthentication';
import { requestLogIn } from '../actions/requestLogIn';
import { requestOnboarding } from '../actions/requestOnboarding';
import { requestSsoAuthentication } from '../actions/requestSsoAuthentication';

type BoclipsSecurityBaseOptions = Pick<
  AuthenticateOptions,
  'realm' | 'clientId' | 'authEndpoint' | 'requireLoginPage'
>;

const defaultOptions: BoclipsSecurityBaseOptions = {
  realm: 'boclips',
  clientId: 'teachers',
  authEndpoint: Constants.AUTH_ENDPOINT,
  requireLoginPage: false,
};

const onLoginRequested = (store: Store) => {
  BoclipsSecurity.createInstance({
    ...defaultOptions,
    onLogin: () => store.dispatch(successfulAuthentication()),
    onFailure: () => store.dispatch(failedAuthentication()),
    requireLoginPage: true,
  });
};

const onAuthenticationCheckRequested = (store: Store) => {
  BoclipsSecurity.createInstance({
    ...defaultOptions,
    onLogin: () => store.dispatch(successfulAuthentication()),
    onFailure: () => store.dispatch(failedAuthentication()),
    requireLoginPage: false,
  });
};

export interface OnboardingOptions {
  username: string;
  password: string;
}
const onOnboardingRequested = (store: Store, options: OnboardingOptions) => {
  BoclipsSecurity.createInstance({
    ...defaultOptions,
    onLogin: () => store.dispatch(successfulAuthentication()),
    onFailure: () => store.dispatch(failedAuthentication()),
    checkLoginIframe: false,
    username: options.username,
    password: options.password,
  });
};

const onSsoAuthenticationRequested = (
  store: Store,
  identityProvider: string,
) => {
  const boclipsSecurity = BoclipsSecurity.createInstance({
    ...defaultOptions,
    onLogin: () => store.dispatch(successfulAuthentication()),
    onFailure: () => store.dispatch(failedAuthentication()),
  });

  boclipsSecurity.ssoLogin({
    idpHint: identityProvider,
    redirectUri: Constants.HOST,
  });
};

export default [
  sideEffect(requestLogIn, onLoginRequested),
  sideEffect(requestAuthenticationCheck, onAuthenticationCheckRequested),
  sideEffect(requestOnboarding, onOnboardingRequested),
  sideEffect(requestSsoAuthentication, onSsoAuthenticationRequested),
];
