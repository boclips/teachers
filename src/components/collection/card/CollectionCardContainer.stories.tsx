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
import { VideoCollection } from '../../../types/VideoCollection';
import CollectionCardContainer from './CollectionCardContainer';
import { CollectionCardSkeleton } from './CollectionCard';

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

const bookmarkableCollection = VideoCollectionFactory.sample({
  title: "Someone else's collection with a really really really long title",
  description:
    'What is Lorem Ipsum?\n' +
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\nand more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n",
  ageRange: new AgeRange(3, 5),
  subjects: [subject.id],
  updatedAt: '2018-12-12T12:12:12',
  isMine: false,
  videoIds: videos.map((video) => VideoIdFactory.sample({ value: video.id })),
  links: {
    self: new Link({ href: '' }),
    bookmark: new Link({ href: '' }),
  },
});

const myCollection = VideoCollectionFactory.sample({
  title: "Someone else's collection with a really really really long title",
  description:
    'What is Lorem Ipsum?\n' +
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\nand more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n",
  ageRange: new AgeRange(3, 5),
  subjects: [subject.id],
  updatedAt: '2018-12-12T12:12:12',
  isMine: true,
  videoIds: videos.map((video) => VideoIdFactory.sample({ value: video.id })),
  links: {
    self: new Link({ href: '' }),
    edit: new Link({ href: '' }),
    remove: new Link({ href: '' }),
  },
});

const bookmarkedCollection = VideoCollectionFactory.sample({
  title: 'My bookmarked collection',
  description:
    'What is Lorem Ipsum?\n' +
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\nand more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n",
  ageRange: new AgeRange(3, 5),
  subjects: [subject.id],
  updatedAt: '2018-12-12T12:12:12',
  isMine: false,
  videoIds: videos.map((video) => VideoIdFactory.sample({ value: video.id })),
  links: {
    self: new Link({ href: '' }),
    unbookmark: new Link({ href: '' }),
  },
});

const collectionWithLessonGuide: VideoCollection = {
  ...bookmarkableCollection,
  attachments: [AttachmentFactory.sample()],
};
const collectionWithoutTags: VideoCollection = {
  ...bookmarkableCollection,
  subjects: [],
  ageRange: new AgeRange(),
};

const collectionWithoutDescription: VideoCollection = {
  ...bookmarkableCollection,
  description: '',
};

const collectionWithoutDescriptionAndTags: VideoCollection = {
  ...bookmarkableCollection,
  subjects: [],
  ageRange: new AgeRange(),
  description: '',
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
  .add('Card with collection which is mine', () => (
    <CollectionCardContainer grid={false} collection={myCollection} />
  ))
  .add('Card with collection which is not bookmarked', () => (
    <CollectionCardContainer grid={false} collection={bookmarkableCollection} />
  ))
  .add('Card with collection which is bookmarked', () => (
    <CollectionCardContainer grid={false} collection={bookmarkedCollection} />
  ))
  .add('Card with Lesson Guide', () => (
    <CollectionCardContainer
      grid={false}
      collection={collectionWithLessonGuide}
    />
  ))
  .add('Card without tags', () => (
    <CollectionCardContainer grid={false} collection={collectionWithoutTags} />
  ))
  .add('Card without description', () => (
    <CollectionCardContainer
      grid={false}
      collection={collectionWithoutDescription}
    />
  ))
  .add('Card without tags and description', () => (
    <CollectionCardContainer
      grid={false}
      collection={collectionWithoutDescriptionAndTags}
    />
  ))
  .add('Grid Card', () => (
    <div style={{ maxWidth: '400px' }}>
      <CollectionCardContainer
        grid={true}
        collection={bookmarkableCollection}
      />{' '}
    </div>
  ))
  .add('Grid Card with no tags', () => (
    <div style={{ maxWidth: '400px' }}>
      <CollectionCardContainer grid={true} collection={collectionWithoutTags} />{' '}
    </div>
  ))
  .add('Grid Card which is mine', () => (
    <div style={{ maxWidth: '400px' }}>
      <CollectionCardContainer grid={true} collection={myCollection} />{' '}
    </div>
  ))

  .add('Grid Card which is bookmarked', () => (
    <div style={{ maxWidth: '400px' }}>
      <CollectionCardContainer grid={true} collection={bookmarkedCollection} />{' '}
    </div>
  ))

  .add('Grid Card with no description', () => (
    <div style={{ maxWidth: '400px' }}>
      <CollectionCardContainer
        grid={true}
        collection={collectionWithoutDescription}
      />{' '}
    </div>
  ))
  .add('Skeleton', () => <CollectionCardSkeleton />);
