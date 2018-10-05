import { authenticate } from 'boclips-js-security';
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './index.less';

authenticate(
  () => {
    ReactDom.render(<App />, document.getElementById('root'));
  },
  'teachers',
  'teachers-ui',
);
