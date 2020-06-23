import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { storyWithProvider, storyWithRouter } from 'src/utils/index.stories';
import { MockStoreFactory } from 'test-support/factories';
import { ShareCodeDialog } from './ShareCodeDialog';

storiesOf('ShareCodeDialog', module)
  .addDecorator(withKnobs)
  .addDecorator(storyWithRouter())
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('Default', () => (
    <ShareCodeDialog
      cta={text('cta', 'Click Here!')}
      title={text('title', 'Type a code')}
    />
  ));
