import {
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { collectionsReducer } from './collectionsReducer';

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
    discoverCollections: undefined,
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
      discoverCollections: undefined,
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
      discoverCollections: undefined,
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

  test('updates discover collection', () => {
    const toBeUpdatedCollection = VideoCollectionFactory.sample({
      id: '123',
      title: 'jose carlos',
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: undefined,
      discoverCollections: PageableCollectionsFactory.sample({
        items: [toBeUpdatedCollection],
      }),
      publicCollections: undefined,
      bookmarkedCollections: undefined,
    };

    const updatedCollection = {
      ...toBeUpdatedCollection,
      title: 'la familia es muy importante',
    };

    const action = onCollectionBookmarkedAction(updatedCollection);

    const discoverCollections = collectionsReducer(stateBefore, action)
      .discoverCollections.items;

    expect(discoverCollections).toHaveLength(1);
    expect(discoverCollections).toContainEqual(updatedCollection);
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
      discoverCollections: undefined,
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
});
