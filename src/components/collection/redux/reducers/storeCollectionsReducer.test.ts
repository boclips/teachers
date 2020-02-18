import {
  CollectionsFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from 'test-support/factories';
import { createReducer } from 'src/app/redux/createReducer';
import { Link } from 'src/types/Link';
import State from 'src/types/State';
import { EntitiesFactory } from 'test-support/factories';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { appendPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

test('can store my collections', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myCollections: undefined });

  const stateBefore: State = MockStoreFactory.sampleState({
    entities: EntitiesFactory.sample({ collections: { byId: {} } }),
    collections,
  });

  const action = storeCollectionsAction({
    collections: {
      items: [collectionToFetch],
      links: {},
    },
    key: 'myCollections',
  });

  const stateAfter = testReducer(stateBefore, action);

  expect(stateAfter.collections.myCollections.items).toEqual([
    collectionToFetch.id,
  ]);
  expect(stateAfter.entities.collections.byId).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});

test('can store a collection', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myCollections: undefined });

  const stateBefore: State = MockStoreFactory.sampleState({
    entities: EntitiesFactory.sample({ collections: { byId: {} } }),
    collections,
  });

  const action = storeCollectionAction(collectionToFetch);

  const stateAfter = testReducer(stateBefore, action);

  expect(stateAfter.collections.collectionIdBeingViewed).toEqual(
    collectionToFetch.id,
  );
  expect(stateAfter.entities.collections.byId).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});

describe('appending pageable collections to different keys', () => {
  test('appending bookmarked collections', () => {
    const stateBefore: State = MockStoreFactory.sampleState({
      collections: {
        updating: false,
        loading: false,
        myCollections: undefined,
        publicCollections: undefined,
        discoverCollections: undefined,
        bookmarkedCollections: PageableCollectionsFactory.sample(),
      },
    });

    const nextCollectionLink = new Link({
      href: 'next-arrow.svg',
      templated: false,
    });

    const action = appendPageableCollectionsAction({
      collections: {
        items: [VideoCollectionFactory.sample({ id: '1' })],
        links: {
          next: nextCollectionLink,
        },
      },
      key: 'bookmarkedCollections',
    });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.entities.collections.byId['1']).not.toBeUndefined();
    expect(stateAfter.collections.bookmarkedCollections.items).toContainEqual(
      '1',
    );
    expect(stateAfter.collections.bookmarkedCollections.links.next).toEqual(
      nextCollectionLink,
    );
  });

  test('appending public collections', () => {
    const stateBefore: State = MockStoreFactory.sampleState({
      collections: {
        updating: false,
        loading: false,
        myCollections: undefined,
        discoverCollections: undefined,
        publicCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const nextCollectionLink = new Link({
      href: 'next-arrow.svg',
      templated: false,
    });

    const action = appendPageableCollectionsAction({
      collections: {
        items: [VideoCollectionFactory.sample()],
        links: {
          next: nextCollectionLink,
        },
      },
      key: 'publicCollections',
    });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.publicCollections.links.next).toEqual(
      nextCollectionLink,
    );
  });

  test('appending discover collections', () => {
    const stateBefore: State = MockStoreFactory.sampleState({
      collections: {
        updating: false,
        loading: false,
        myCollections: undefined,
        discoverCollections: PageableCollectionsFactory.sample(),
        publicCollections: undefined,
        bookmarkedCollections: undefined,
      },
    });

    const nextCollectionLink = new Link({
      href: 'next-arrow.svg',
      templated: false,
    });

    const action = appendPageableCollectionsAction({
      collections: {
        items: [VideoCollectionFactory.sample()],
        links: {
          next: nextCollectionLink,
        },
      },
      key: 'discoverCollections',
    });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.discoverCollections.links.next).toEqual(
      nextCollectionLink,
    );
  });

  test('appending mycollections', () => {
    const stateBefore: State = MockStoreFactory.sampleState({
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample(),
        discoverCollections: undefined,
        publicCollections: undefined,
        bookmarkedCollections: undefined,
      },
    });

    const nextCollectionLink = new Link({
      href: 'next-arrow.svg',
      templated: false,
    });

    const action = appendPageableCollectionsAction({
      collections: {
        items: [VideoCollectionFactory.sample()],
        links: {
          next: nextCollectionLink,
        },
      },
      key: 'myCollections',
    });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.myCollections.links.next).toEqual(
      nextCollectionLink,
    );
  });
});
