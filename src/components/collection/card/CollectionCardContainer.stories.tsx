import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  AttachmentFactory,
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
import { Link } from '../../../types/Link';
import CollectionCardContainer from './CollectionCardContainer';
import { VideoCollection } from '../../../types/VideoCollection';

const subject = SubjectFactory.sample({ name: 'My Subject' });

const videos = [
  VideoFactory.sample({
    id: 'video-one-id',
    thumbnailUrl: 'https://picsum.photos/seed/1/300/200',
  }),
  VideoFactory.sample({
    id: 'video-two-id',
    thumbnailUrl: 'https://picsum.photos/seed/2/300/200',
  }),
  VideoFactory.sample({
    id: 'video-three-id',
    thumbnailUrl: 'https://picsum.photos/seed/3/300/200',
  }),
  VideoFactory.sample({
    id: 'video-four-id',
    thumbnailUrl: 'https://picsum.photos/seed/4/300/200',
  }),
  VideoFactory.sample({
    id: 'video-five-id',
    thumbnailUrl: 'https://picsum.photos/seed/5/300/200',
  }),
  VideoFactory.sample({
    id: 'video-six-id',
    thumbnailUrl: 'https://picsum.photos/seed/6/300/200',
  }),
];

const collection = VideoCollectionFactory.sample({
  title: 'My collection title',
  description:
    'What is Lorem Ipsum?\n' +
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\nand more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n",
  ageRange: new AgeRange(3, 5),
  subjects: [subject.id],
  updatedAt: '2018-12-12T12:12:12',
  isMine: false,
  isPublic: true,
  videoIds: videos.map(video => VideoIdFactory.sample({ value: video.id })),
  links: {
    self: new Link({ href: '' }),
    bookmark: new Link({ href: '' }),
  },
});

const collectionWithLessonPlan: VideoCollection = {
  ...collection,
  attachments: [AttachmentFactory.sample()],
};

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
            byId: videos.reduce((acc, video) => {
              acc[video.id] = video;
              return acc;
            }, {}),
          },
        },
      }),
    ),
  )
  .addDecorator(storyWithRouter())
  .addDecorator(story => <div style={{ width: '80%' }}>{story()}</div>)
  .add('Regular Card', () => (
    <CollectionCardContainer mode={'regular'} collection={collection} />
  ))
  .add('Tiny Card', () => (
    <div style={{ width: '400px' }}>
      <CollectionCardContainer mode={'tiny'} collection={collection} />{' '}
    </div>
  ))
  .add('Search Card', () => (
    <CollectionCardContainer mode={'search'} collection={collection} />
  ))
  .add('Search Card with Lesson Plan', () => (
    <CollectionCardContainer
      mode={'search'}
      collection={collectionWithLessonPlan}
    />
  ));
