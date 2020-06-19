import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ShareCodeDialog } from './ShareCodeDialog';

storiesOf('ShareCodeDialog', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <ShareCodeDialog
      cta={text('cta', 'Click Here!')}
      title={text('title', 'Type a code')}
    />
  ));
