import { storiesOf } from '@storybook/react';
import { A11ySkipLink } from 'src/components/common/a11y/A11ySkipLink';
import React from 'react';

storiesOf('A11ySkipLink', module).add('Skip to content', () => (
  <A11ySkipLink hash="results">
    <b>Skip to main content</b>
  </A11ySkipLink>
));
