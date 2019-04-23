import ApiStub from '../../../../../test-support/ApiStub';
import {
  CollectionsFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { Link } from '../../../../types/Link';
import { CollectionsStateValue } from '../../../../types/State';
import { addVideoToCollectionAction } from '../actions/addToCollectionAction';
import { appendBookmarkedCollectionsAction } from '../actions/appendBookmarkedCollectionsAction';
import { appendPublicCollectionsAction } from '../actions/appendPublicCollectionsAction';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionEditedAction } from '../actions/onCollectionEditedAction';
import { onCollectionRemovedAction } from '../actions/onCollectionRemovedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { removeVideoFromCollectionAction } from '../actions/removeFromCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { collectionsReducer } from './collectionsReducer';

describe('adding video to collection', () => {
  test('adding a video to a collection reduces user collections', () => {
    const targetCollection = VideoCollectionFactory.sample({
      id: 'target',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '123' }),
      ]),
    });
    const otherCollection = VideoCollectionFactory.sample({
      id: 'irrelevant',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '333' }),
      ]),
    });
    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: [otherCollection, targetCollection],
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const newVideo = VideoFactory.sample({ id: '124' });
    const action = addVideoToCollectionAction({
      video: newVideo,
      collection: targetCollection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(stateAfter.myCollections[0]).toEqual(otherCollection);
    expect(stateAfter.myCollections[1]).not.toEqual(targetCollection);
    expect(Object.keys(stateAfter.myCollections[1].videos)).toHaveLength(2);
    expect(stateAfter.myCollections[1].videos['124']).toEqual(newVideo);
    expect(stateAfter.myCollections[1].videoIds).toHaveLength(2);
    expect(stateAfter.myCollections[1].videoIds.map(id => id.id)).toContain(
      '124',
    );
  });

  test('adding a duplicate video to a collection does not re-add it', () => {
    const video = VideoFactory.sample({ id: '123' });
    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videos: VideoCollectionFactory.sampleVideos([video]),
    });
    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: [collection],
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = addVideoToCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(false);
    expect(Object.keys(stateAfter.myCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.myCollections[0].videoIds).toHaveLength(1);
  });

  test('adding a new video that we already know about in the video ids list only updates the video map', () => {
    const video = VideoFactory.sample({ id: '123' });
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
      myCollections: [collection],
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = addVideoToCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.myCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.myCollections[0].videoIds).toHaveLength(1);
  });
});

describe('removing videos from a colleciton', () => {
  test('removing a video from a collection', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '123' }),
        VideoFactory.sample({ id: '124' }),
      ]),
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: [collection],
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const videoToRemove = VideoFactory.sample({ id: '123' });
    const action = removeVideoFromCollectionAction({
      video: videoToRemove,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.myCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.myCollections[0].videos['124'].id).toEqual('124');
    expect(stateAfter.myCollections[0].videoIds).toHaveLength(1);
    expect(stateAfter.myCollections[0].videoIds[0].id).toEqual('124');
  });
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
      myCollections: [collection],
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(Object.keys(stateAfter.myCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.myCollections[0].videos[video.id].title).toEqual(
      video.title,
    );
    expect(stateAfter.myCollections[0].videos[video.id].id).toEqual(video.id);
    expect(stateAfter.myCollections[0].videoIds).toHaveLength(1);
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
      publicCollectionDetails: collection,
      myCollections: [],
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(Object.keys(stateAfter.publicCollectionDetails.videos)).toHaveLength(
      1,
    );
    expect(stateAfter.publicCollectionDetails.videos[video.id].title).toEqual(
      video.title,
    );
    expect(stateAfter.publicCollectionDetails.videos[video.id].id).toEqual(
      video.id,
    );
    expect(stateAfter.publicCollectionDetails.videoIds).toHaveLength(1);
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
      myCollections: [],
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
      myCollections: [],
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

describe('bookmarking a collection', () => {
  test('adds collection to bookmarks', () => {
    const toBeBookmarkedCollection = VideoCollectionFactory.sample();
    const untouchedCollection = VideoCollectionFactory.sample({
      id: 'another-collection',
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: undefined,
      publicCollections: undefined,
      bookmarkedCollections: PageableCollectionsFactory.sample({
        items: [untouchedCollection],
      }),
    };

    const action = onCollectionBookmarkedAction(toBeBookmarkedCollection);

    const updatedBookmarks = collectionsReducer(stateBefore, action)
      .bookmarkedCollections.items;

    expect(updatedBookmarks).toHaveLength(2);
    expect(updatedBookmarks).toContain(toBeBookmarkedCollection);
    expect(updatedBookmarks).toContain(untouchedCollection);
  });

  test('updates public collection', () => {
    const toBeUpdatedCollection = VideoCollectionFactory.sample({
      id: '123',
      title: 'jose carlos',
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: undefined,
      publicCollections: PageableCollectionsFactory.sample({
        items: [toBeUpdatedCollection],
      }),
      bookmarkedCollections: undefined,
    };

    const updatedCollection = {
      ...toBeUpdatedCollection,
      title: 'la familia es muy importante',
    };

    const action = onCollectionBookmarkedAction(updatedCollection);

    const publicCollections = collectionsReducer(stateBefore, action)
      .publicCollections.items;

    expect(publicCollections).toHaveLength(1);
    expect(publicCollections).toContainEqual(updatedCollection);
  });
});

describe('unbookmarking a collection', () => {
  test('removes collection from bookmarks', () => {
    const toBeUnbookmarkedCollection = VideoCollectionFactory.sample();
    const untouchedCollection = VideoCollectionFactory.sample({
      id: 'another-collection',
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: undefined,
      publicCollections: undefined,
      bookmarkedCollections: PageableCollectionsFactory.sample({
        items: [toBeUnbookmarkedCollection, untouchedCollection],
      }),
    };

    const action = onCollectionUnbookmarkedAction(toBeUnbookmarkedCollection);

    const updatedBookmarks = collectionsReducer(stateBefore, action)
      .bookmarkedCollections.items;

    expect(updatedBookmarks).toHaveLength(1);
    expect(updatedBookmarks).toContain(untouchedCollection);
  });

  test('updates public collection', () => {
    const toBeUpdatedCollection = VideoCollectionFactory.sample({
      id: '123',
      title: 'jose carlos',
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: undefined,
      publicCollections: PageableCollectionsFactory.sample({
        items: [toBeUpdatedCollection],
      }),
      bookmarkedCollections: undefined,
    };

    const updatedCollection = {
      ...toBeUpdatedCollection,
      title: 'la familia es muy importante',
    };

    const action = onCollectionUnbookmarkedAction(updatedCollection);

    const publicCollections = collectionsReducer(stateBefore, action)
      .publicCollections.items;

    expect(publicCollections).toHaveLength(1);
    expect(publicCollections).toContainEqual(updatedCollection);
  });
});

test('remove a collection', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: [collection],
    publicCollections: PageableCollectionsFactory.sample(),
    bookmarkedCollections: undefined,
  };

  const action = onCollectionRemovedAction(collection);

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.myCollections).toHaveLength(0);
});

test('editing a collection', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: [collection],
    publicCollections: PageableCollectionsFactory.sample(),
    bookmarkedCollections: undefined,
  };

  const editedCollection = { ...collection, title: 'changed' };

  const action = onCollectionEditedAction(editedCollection);

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.myCollections.length).toEqual(1);
  expect(stateAfter.myCollections[0].title).toEqual('changed');
});

test('appending public collections', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: [collection],
    publicCollections: PageableCollectionsFactory.sample(),
    bookmarkedCollections: undefined,
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendPublicCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: stateBefore.myCollections,
      links: {
        next: nextCollectionLink,
      },
    }),
    key: 'publicCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.publicCollections.links.next).toEqual(nextCollectionLink);
});

test('appending bookmarked collections', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: [collection],
    publicCollections: undefined,
    bookmarkedCollections: PageableCollectionsFactory.sample(),
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendBookmarkedCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: stateBefore.myCollections,
      links: {
        next: nextCollectionLink,
      },
    }),
    key: 'bookmarkedCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.bookmarkedCollections.links.next).toEqual(
    nextCollectionLink,
  );
});

test('can fetch my collections', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    ...CollectionsFactory.sample(),
  };

  const action = storeCollectionsAction({
    collections: [collectionToFetch],
    key: 'myCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.myCollections).toEqual([collectionToFetch]);
});
