import { storiesOf } from '@storybook/react';
import React from 'react';

import { VideoFactory } from '../../../../test-support/factories';
import { CollectionCardSearchPreview } from './CollectionCardSearchPreview';

const videos = [
  VideoFactory.sample({
    thumbnailUrl: 'https://picsum.photos/seed/1/300/200',
  }),
  VideoFactory.sample({
    thumbnailUrl: 'https://picsum.photos/seed/2/300/200',
  }),
  VideoFactory.sample({
    thumbnailUrl: 'https://picsum.photos/seed/3/300/200',
  }),
  VideoFactory.sample({
    thumbnailUrl: 'https://picsum.photos/seed/4/300/200',
  }),
  VideoFactory.sample({
    thumbnailUrl: 'https://picsum.photos/seed/5/300/200',
  }),
  VideoFactory.sample({
    thumbnailUrl: 'https://picsum.photos/seed/6/300/200',
  }),
];

storiesOf('CollectionCardSearchPreview', module)
  .add('With one video', () => (
    <CollectionCardSearchPreview videos={videos.slice(0, 1)} />
  ))
  .add('With two videos', () => (
    <CollectionCardSearchPreview videos={videos.slice(0, 2)} />
  ))
  .add('With three videos', () => (
    <CollectionCardSearchPreview videos={videos.slice(0, 3)} />
  ))
  .add('With four videos', () => (
    <CollectionCardSearchPreview videos={videos.slice(0, 4)} />
  ))
  .add('With six videos', () => (
    <CollectionCardSearchPreview videos={videos.slice(0, 6)} />
  ));
