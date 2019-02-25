import React from 'react';
import ReactDom from 'react-dom';
import { StackdriverErrorReporter } from 'stackdriver-errors-js';
import App from './app/App';
import './index.less';

const environment = process.env.NODE_ENV;

if (environment !== 'development') {
  window.addEventListener('DOMContentLoaded', () => {
    // https://github.com/GoogleCloudPlatform/stackdriver-errors-js/issues/15#issuecomment-306594058
    (window as any).StackTrace = require('stacktrace-js');
    const errorHandler = new StackdriverErrorReporter();
    errorHandler.start({
      key: 'AIzaSyDccbot7jB0CeNid_GY3jaPKylhk1DBVLA',
      projectId: 'boclips-prod',
    });
  });
}

ReactDom.render(<App />, document.getElementById('root'));
