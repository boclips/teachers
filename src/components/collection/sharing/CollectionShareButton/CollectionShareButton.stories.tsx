import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  MockStoreFactory,
  VideoCollectionFactory,
} from 'test-support/factories';
import { storyWithProvider } from 'src/utils/index.stories';
import { CollectionShareButton } from './CollectionShareButton';

const collection = VideoCollectionFactory.sample({
  id: '1243',
  title: 'The Best Collection!',
});

storiesOf('CollectionShareModal', module)
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('Sharing a collection', () => (
    <CollectionShareButton collection={collection} />
  ));
