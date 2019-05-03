import ApiStub from '../../../../../test-support/ApiStub';
import {
  CollectionsFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { collectionsReducer } from './collectionsReducer';

test('can fetch my collections', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    ...CollectionsFactory.sample(),
  };

  const action = storeCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: [collectionToFetch],
    }),
    key: 'myCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.myCollections.items).toEqual([collectionToFetch]);
});

describe('fetch video for collection', () => {
  test('sets videos in user collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(Object.keys(stateAfter.myCollections.items[0].videos)).toHaveLength(
      1,
    );
    expect(stateAfter.myCollections.items[0].videos[video.id].title).toEqual(
      video.title,
    );
    expect(stateAfter.myCollections.items[0].videos[video.id].id).toEqual(
      video.id,
    );
    expect(stateAfter.myCollections.items[0].videoIds).toHaveLength(1);
  });

  test('sets videos in collection details', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      collectionBeingViewed: collection,
      myCollections: undefined,
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(Object.keys(stateAfter.collectionBeingViewed.videos)).toHaveLength(
      1,
    );
    expect(stateAfter.collectionBeingViewed.videos[video.id].title).toEqual(
      video.title,
    );
    expect(stateAfter.collectionBeingViewed.videos[video.id].id).toEqual(
      video.id,
    );
    expect(stateAfter.collectionBeingViewed.videoIds).toHaveLength(1);
  });

  test('sets videos in public collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      publicCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
      myCollections: undefined,
      bookmarkedCollections: undefined,
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(
      Object.keys(stateAfter.publicCollections.items[0].videos),
    ).toHaveLength(1);
    expect(
      stateAfter.publicCollections.items[0].videos[video.id].title,
    ).toEqual(video.title);
    expect(stateAfter.publicCollections.items[0].videos[video.id].id).toEqual(
      video.id,
    );
    expect(stateAfter.publicCollections.items[0].videoIds).toHaveLength(1);
  });

  test('sets videos in bookmarked collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      publicCollections: undefined,
      myCollections: undefined,
      bookmarkedCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(
      Object.keys(stateAfter.bookmarkedCollections.items[0].videos),
    ).toHaveLength(1);
    expect(
      stateAfter.bookmarkedCollections.items[0].videos[video.id].title,
    ).toEqual(video.title);
    expect(
      stateAfter.bookmarkedCollections.items[0].videos[video.id].id,
    ).toEqual(video.id);
    expect(stateAfter.bookmarkedCollections.items[0].videoIds).toHaveLength(1);
  });
});
