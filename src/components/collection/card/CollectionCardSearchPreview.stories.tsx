import { storiesOf } from '@storybook/react';
import React from 'react';

import {
  VideoCollectionFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../test-support/factories';
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

const getCollection = (numberOfVideos: number) => VideoCollectionFactory.sample({
    videoIds: videos
      .slice(0, numberOfVideos)
      .map(video => VideoIdFactory.sample({ value: video.id })),
  });

storiesOf('CollectionCardSearchPreview', module)
  .add('With one video', () => (
    <CollectionCardSearchPreview
      collection={getCollection(1)}
      videos={videos.slice(0, 1)}
    />
  ))
  .add('With two videos', () => (
    <CollectionCardSearchPreview
      collection={getCollection(2)}
      videos={videos.slice(0, 2)}
    />
  ))
  .add('With three videos', () => (
    <CollectionCardSearchPreview
      collection={getCollection(3)}
      videos={videos.slice(0, 3)}
    />
  ))
  .add('With four videos', () => (
    <CollectionCardSearchPreview
      collection={getCollection(4)}
      videos={videos.slice(0, 4)}
    />
  ))
  .add('With six videos', () => (
    <CollectionCardSearchPreview
      collection={getCollection(5)}
      videos={videos.slice(0, 6)}
    />
  ));
