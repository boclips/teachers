import './index.less';
// CSS breaks when index.less joins the rest of the imports

import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDom from 'react-dom';
import { ExtraErrorData } from '@sentry/integrations';
import App from './app/App';
import { Constants } from './app/AppConstants';

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
    integrations: [new ExtraErrorData()],
    blacklistUrls: [
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
    ],
  });

  addHubspotScript();
}

ReactDom.render(
  <App apiPrefix={Constants.API_PREFIX} />,
  document.getElementById('root'),
);
