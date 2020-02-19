import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  MockStoreFactory,
  VideoCollectionFactory,
} from 'test-support/factories';
import { CollectionShareModal } from 'src/components/collection/sharing/CollectionShareModal/CollectionShareModal';
import { noOp } from '../../../../utils';
import { storyWithProvider } from '../../../../utils/index.stories';

const collection = VideoCollectionFactory.sample({id: '1243',title: "The Best Collection!"});

storiesOf('CollectionShareModal', module)
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('In mobile view', () => (
    <CollectionShareModal
      visible={true}
      handleClose={noOp}
      collection={collection}
    />
  ))
  .add('In desktop view', () => (
    <CollectionShareModal
      visible={true}
      handleClose={noOp}
      collection={collection}
    />
  ));
