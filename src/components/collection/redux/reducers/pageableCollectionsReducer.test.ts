import {
  MockStoreFactory,
  PageableCollectionsFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import { Link } from '../../../../types/Link';
import State from '../../../../types/State';
import { appendPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { VideoCollectionFactory } from './../../../../../test-support/factories';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

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
    href: 'next',
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
    href: 'next',
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
    href: 'next',
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
    href: 'next',
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
