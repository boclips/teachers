import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { RestrictiveTimePicker } from './RestrictiveTimePicker';

storiesOf('RestrictiveTimePicker', module).add(
  'with a 2 minute restriction',
  () => (
    <RestrictiveTimePicker
      checkboxLabel="Checkbox label"
      label="Label"
      upperBound={120}
      onChange={action('changed time')}
      initialValue={62}
    />
  ),
);
