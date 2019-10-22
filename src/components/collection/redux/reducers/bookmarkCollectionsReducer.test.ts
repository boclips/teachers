import {
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import State from '../../../../types/State';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { MockStoreFactory } from './../../../../../test-support/factories';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

describe('bookmarking a collection', () => {
  test('adds collection to bookmarks', () => {
    const toBeBookmarkedCollection = VideoCollectionFactory.sample();
    const untouchedCollection = VideoCollectionFactory.sample({
      id: 'another-collection',
    });

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: {
        collections: {
          byId: { [untouchedCollection.id]: untouchedCollection },
        },
      },
      collections: {
        updating: false,
        loading: false,
        myCollections: undefined,
        publicCollections: undefined,
        discoverCollections: undefined,
        bookmarkedCollections: PageableCollectionsFactory.sample({
          items: [untouchedCollection.id],
        }),
      },
    });

    const action = onCollectionBookmarkedAction(toBeBookmarkedCollection);

    const updatedBookmarks = testReducer(stateBefore, action).collections
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

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: {
        collections: {
          byId: {
            [toBeUnbookmarkedCollection.id]: toBeUnbookmarkedCollection,
            [untouchedCollection.id]: untouchedCollection,
          },
        },
      },
      collections: {
        updating: false,
        loading: false,
        myCollections: undefined,
        publicCollections: undefined,
        discoverCollections: undefined,
        bookmarkedCollections: PageableCollectionsFactory.sample({
          items: [toBeUnbookmarkedCollection.id, untouchedCollection.id],
        }),
      },
    });

    const action = onCollectionUnbookmarkedAction(toBeUnbookmarkedCollection);

    const updatedBookmarks = testReducer(stateBefore, action).collections
      .bookmarkedCollections.items;

    expect(updatedBookmarks).toHaveLength(1);
    expect(updatedBookmarks).toContain(untouchedCollection.id);
  });
});
