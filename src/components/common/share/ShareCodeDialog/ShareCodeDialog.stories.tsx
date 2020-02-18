import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ShareCodeDialog } from './ShareCodeDialog';

storiesOf('ShareCodeDialog', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <ShareCodeDialog
      codeInvalid={boolean('codeInvalid', false)}
      cta={text('cta', 'Click Here!')}
      title={text('title', 'Type a code')}
      onSubmit={console.warn}
      visible={boolean('visible', true)}
    />
  ));
