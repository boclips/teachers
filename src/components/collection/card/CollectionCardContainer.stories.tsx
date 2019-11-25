import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  MockStoreFactory,
  SubjectFactory,
  VideoCollectionFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../test-support/factories';
import { AgeRange } from '../../../types/AgeRange';
import {
  storyWithAuthentication,
  storyWithProvider,
  storyWithRouter,
} from '../../../utils/index.stories';
import CollectionCardContainer from './CollectionCardContainer';

const subject = SubjectFactory.sample({ name: 'My Subject' });

const videos = [
  VideoFactory.sample({ id: 'video-one-id' }),
  VideoFactory.sample({ id: 'video-two-id' }),
];

storiesOf('CollectionCardContainer', module)
  .addDecorator(storyWithAuthentication())
  .addDecorator(
    storyWithProvider(
      MockStoreFactory.sample({
        subjects: [subject],
        entities: {
          collections: {
            byId: {},
          },
          videos: {
            byId: {
              'video-one-id': videos[0],
              'video-two-id': videos[1],
            },
          },
        },
      }),
    ),
  )
  .addDecorator(storyWithRouter())
  .addDecorator(story => <div style={{ width: '80%' }}>{story()}</div>)
  .add('Regular Card', () => {
    const myCollection = VideoCollectionFactory.sample({
      title: 'My collection title',
      description: 'A description',
      ageRange: new AgeRange(3, 5),
      subjects: [subject.id],
      updatedAt: '2018-12-12T12:12:12',
      videoIds: videos.map(video => VideoIdFactory.sample({ value: video.id })),
    });

    return <CollectionCardContainer collection={myCollection} />;
  });
