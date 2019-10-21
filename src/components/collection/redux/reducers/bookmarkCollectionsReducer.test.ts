import {
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { collectionsReducer } from './collectionsReducer';

describe('bookmarking a collection', () => {
  test('adds collection to bookmarks', () => {
    const toBeBookmarkedCollection = VideoCollectionFactory.sample();
    const untouchedCollection = VideoCollectionFactory.sample({
      id: 'another-collection',
    });

    const stateBefore: CollectionsStateValue = {
      byId: { [untouchedCollection.id]: untouchedCollection },
      updating: false,
      loading: false,
      myCollections: undefined,
      publicCollections: undefined,
      discoverCollections: undefined,
      bookmarkedCollections: PageableCollectionsFactory.sample({
        items: [untouchedCollection.id],
      }),
    };

    const action = onCollectionBookmarkedAction(toBeBookmarkedCollection);

    const updatedBookmarks = collectionsReducer(stateBefore, action)
      .bookmarkedCollections.items;

    expect(updatedBookmarks).toHaveLength(2);
    expect(updatedBookmarks).toContain(toBeBookmarkedCollection.id);
    expect(updatedBookmarks).toContain(untouchedCollection.id);
  });
});

describe('unbookmarking a collection', () => {
  test('removes collection from bookmarks', () => {
    const toBeUnbookmarkedCollection = VideoCollectionFactory.sample();
    const untouchedCollection = VideoCollectionFactory.sample({
      id: 'another-collection',
    });

    const stateBefore: CollectionsStateValue = {
      byId: {
        [toBeUnbookmarkedCollection.id]: toBeUnbookmarkedCollection,
        [untouchedCollection.id]: untouchedCollection,
      },
      updating: false,
      loading: false,
      myCollections: undefined,
      publicCollections: undefined,
      discoverCollections: undefined,
      bookmarkedCollections: PageableCollectionsFactory.sample({
        items: [toBeUnbookmarkedCollection.id, untouchedCollection.id],
      }),
    };

    const action = onCollectionUnbookmarkedAction(toBeUnbookmarkedCollection);

    const updatedBookmarks = collectionsReducer(stateBefore, action)
      .bookmarkedCollections.items;

    expect(updatedBookmarks).toHaveLength(1);
    expect(updatedBookmarks).toContain(untouchedCollection.id);
  });
});
