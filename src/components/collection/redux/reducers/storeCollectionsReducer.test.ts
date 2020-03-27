import {
  CollectionsFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import { Link } from '../../../../types/Link';
import State from '../../../../types/State';
import { appendPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { EntitiesFactory } from './../../../../../test-support/factories';
import { collectionHandlers } from './collectionEntitiesReducer';

const testReducer = createReducer(...collectionHandlers);
test('can store my resources', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myResources: undefined });

  const stateBefore: State = MockStoreFactory.sampleState({
    entities: EntitiesFactory.sample({ collections: { byId: {} } }),
    collections,
  });

  const action = storeCollectionsAction({
    collections: {
      items: [collectionToFetch],
      links: {},
    },
    key: 'myResources',
  });

  const stateAfter = testReducer(stateBefore, action);

  expect(stateAfter.collections.myResources.items).toEqual([
    collectionToFetch.id,
  ]);
  expect(stateAfter.entities.collections.byId).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});

test('can store my collections', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myResources: undefined });

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
  test('appending public collections', () => {
    const stateBefore: State = MockStoreFactory.sampleState({
      collections: {
        updating: false,
        loading: false,
        myCollections: undefined,
        discoverCollections: undefined,
        promotedCollections: undefined,
        publicCollections: PageableCollectionsFactory.sample(),
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
        promotedCollections: undefined,
        discoverCollections: PageableCollectionsFactory.sample(),
        publicCollections: undefined,
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

  test('appending myResources', () => {
    const stateBefore: State = MockStoreFactory.sampleState({
      collections: {
        updating: false,
        loading: false,
        myCollections: undefined,
        promotedCollections: undefined,
        myResources: PageableCollectionsFactory.sample(),
        discoverCollections: undefined,
        publicCollections: undefined,
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
      key: 'myResources',
    });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.myResources.links.next).toEqual(
      nextCollectionLink,
    );
  });
});
