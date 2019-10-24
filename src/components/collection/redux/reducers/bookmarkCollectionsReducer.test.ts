import {
  CollectionsFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import { Link } from '../../../../types/Link';
import State from '../../../../types/State';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import {
  EntitiesFactory,
  MockStoreFactory,
} from './../../../../../test-support/factories';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

describe('bookmarking a collection', () => {
  test('adds collection to bookmarks', () => {
    const toBeBookmarkedCollection = VideoCollectionFactory.sample();
    const untouchedCollection = VideoCollectionFactory.sample({
      id: 'another-collection',
    });

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: {
          byId: { [untouchedCollection.id]: untouchedCollection },
        },
      }),
      collections: CollectionsFactory.sample({
        bookmarkedCollections: PageableCollectionsFactory.sample({
          items: [untouchedCollection.id],
        }),
      }),
    });

    const action = onCollectionBookmarkedAction(toBeBookmarkedCollection);

    const updatedBookmarks = testReducer(stateBefore, action).collections
      .bookmarkedCollections.items;

    expect(updatedBookmarks).toHaveLength(2);
    expect(updatedBookmarks).toContain(toBeBookmarkedCollection.id);
    expect(updatedBookmarks).toContain(untouchedCollection.id);
  });

  // Adding to a page response from the server seems odd. This test maintains
  // current behaviour, but the current behaviour might need to change.
  test('updates collection but does not add to bookmarks with no bookmarks present', () => {
    const toBeBookmarkedCollection = VideoCollectionFactory.sample();

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: {
          byId: { [toBeBookmarkedCollection.id]: toBeBookmarkedCollection },
        },
      }),
      collections: CollectionsFactory.sample({
        bookmarkedCollections: undefined,
      }),
    });

    const bookedmarkedCollection = VideoCollectionFactory.sample({
      id: toBeBookmarkedCollection.id,
      links: VideoCollectionLinksFactory.sample({
        unbookmark: new Link({ href: 'blah' }),
      }),
    });

    const action = onCollectionBookmarkedAction(bookedmarkedCollection);
    const stateAfter = testReducer(stateBefore, action);
    const bookmarkedCollections = stateAfter.collections.bookmarkedCollections;

    expect(bookmarkedCollections).toBeUndefined();
    expect(
      stateAfter.entities.collections.byId[toBeBookmarkedCollection.id],
    ).toEqual(bookedmarkedCollection);
  });
});

describe('unbookmarking a collection', () => {
  test('removes collection from bookmarks', () => {
    const toBeUnbookmarkedCollection = VideoCollectionFactory.sample();
    const untouchedCollection = VideoCollectionFactory.sample({
      id: 'another-collection',
    });

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: {
          byId: {
            [toBeUnbookmarkedCollection.id]: toBeUnbookmarkedCollection,
            [untouchedCollection.id]: untouchedCollection,
          },
        },
      }),
      collections: CollectionsFactory.sample({
        bookmarkedCollections: PageableCollectionsFactory.sample({
          items: [toBeUnbookmarkedCollection.id, untouchedCollection.id],
        }),
      }),
    });

    const action = onCollectionUnbookmarkedAction(toBeUnbookmarkedCollection);

    const updatedBookmarks = testReducer(stateBefore, action).collections
      .bookmarkedCollections.items;

    expect(updatedBookmarks).toHaveLength(1);
    expect(updatedBookmarks).toContain(untouchedCollection.id);
  });

  // Removing from a page response from the server seems odd. This test maintains
  // current behaviour, but the current behaviour might need to change.
  test('updates collection but does not remove from bookmarks with no bookmarks present', () => {
    const toBeUnbookmarkedCollection = VideoCollectionFactory.sample();

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: {
          byId: { [toBeUnbookmarkedCollection.id]: toBeUnbookmarkedCollection },
        },
      }),
      collections: CollectionsFactory.sample({
        bookmarkedCollections: undefined,
      }),
    });

    const unbookedmarkedCollection = VideoCollectionFactory.sample({
      id: toBeUnbookmarkedCollection.id,
      links: VideoCollectionLinksFactory.sample({
        bookmark: new Link({ href: 'blah' }),
      }),
    });
    const action = onCollectionUnbookmarkedAction(unbookedmarkedCollection);
    const stateAfter = testReducer(stateBefore, action);

    expect(
      stateAfter.entities.collections.byId[toBeUnbookmarkedCollection.id],
    ).toEqual(unbookedmarkedCollection);
  });
});
