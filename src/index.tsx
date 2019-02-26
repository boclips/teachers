import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDom from 'react-dom';
import App from './app/App';
import './index.less';

const environment = process.env.NODE_ENV;

if (environment === 'production') {
  Sentry.init({
    dsn: 'https://0da84012df0643bd8876a2336cbe5d92@sentry.io/1402914',
  });
}

ReactDom.render(<App />, document.getElementById('root'));
