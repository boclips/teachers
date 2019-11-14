import { configure } from '@storybook/react';
import '@storybook/addon-console';
import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport/dist/defaults';

const req = require.context('../src', true, /.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);

addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });
