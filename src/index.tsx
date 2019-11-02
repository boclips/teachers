import './index.less';
// CSS breaks when index.less joins the rest of the imports

import * as Sentry from '@sentry/browser';
import BoclipsSecurity, { extractEndpoint } from 'boclips-js-security';
import { AuthenticateOptions } from 'boclips-js-security/dist/BoclipsSecurity';
import React, { Suspense } from 'react';
import ReactDom from 'react-dom';
const App = React.lazy(() => import('./app/App'));

const onceLoggedIn = () => {
  const environment = process.env.NODE_ENV;

  const addHubspotScript = () => {
    const hubspotScript = document.createElement('script');
    hubspotScript.setAttribute('type', 'text/javascript');
    hubspotScript.setAttribute('id', 'hs-script-loader');
    hubspotScript.setAttribute('async', 'true');
    hubspotScript.setAttribute('defer', 'true');
    hubspotScript.src = '//js.hs-scripts.com/4854096.js';

    document.head.appendChild(hubspotScript);
  };

  if (environment === 'production') {
    const sentryRelease = process.env.SENTRY_RELEASE;

    Sentry.init({
      dsn: 'https://0da84012df0643bd8876a2336cbe5d92@sentry.io/1402914',
      release: sentryRelease,
      environment,
    });

    addHubspotScript();
  }
};

const defaultAuthEndpoint =
  process.env.ENVIRONMENT_DOMAIN &&
  `https://login.${process.env.ENVIRONMENT_DOMAIN}/auth`;

const onceAuthenticationResolved = (authenticated: boolean) => {
  ReactDom.render(
    <Suspense fallback={<div>hello world</div>}>
      <App
        authenticated={authenticated}
        apiPrefix={extractEndpoint(window.location.hostname, 'api')}
      />
    </Suspense>,
    document.getElementById('root'),
  );
  onceLoggedIn();
};

const authOptions: AuthenticateOptions = {
  realm: 'boclips',
  clientId: 'teachers',
  mode: 'login-required',
  authEndpoint: defaultAuthEndpoint,
  onLogin: () => {
    onceAuthenticationResolved(true);
  },
  onFailure: () => {
    onceAuthenticationResolved(false);
  },
};

export const security = BoclipsSecurity.createInstance(authOptions);
