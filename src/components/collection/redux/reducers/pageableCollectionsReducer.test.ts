import { PageableCollectionsFactory } from '../../../../../test-support/factories';
import { Link } from '../../../../types/Link';
import { CollectionsStateValue } from '../../../../types/State';
import { appendPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { VideoCollectionFactory } from './../../../../../test-support/factories';
import { collectionsReducer } from './collectionsReducer';

test('appending bookmarked collections', () => {
  const stateBefore: CollectionsStateValue = {
    collections: {},
    updating: false,
    loading: false,
    myCollections: undefined,
    publicCollections: undefined,
    discoverCollections: undefined,
    bookmarkedCollections: PageableCollectionsFactory.sample(),
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendPageableCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: [VideoCollectionFactory.sample()],
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

test('appending public collections', () => {
  const stateBefore: CollectionsStateValue = {
    collections: {},
    updating: false,
    loading: false,
    myCollections: undefined,
    discoverCollections: undefined,
    publicCollections: PageableCollectionsFactory.sample(),
    bookmarkedCollections: undefined,
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendPageableCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: [VideoCollectionFactory.sample()],
      links: {
        next: nextCollectionLink,
      },
    }),
    key: 'publicCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.publicCollections.links.next).toEqual(nextCollectionLink);
});

test('appending discover collections', () => {
  const stateBefore: CollectionsStateValue = {
    collections: {},
    updating: false,
    loading: false,
    myCollections: undefined,
    discoverCollections: PageableCollectionsFactory.sample(),
    publicCollections: undefined,
    bookmarkedCollections: undefined,
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendPageableCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: [VideoCollectionFactory.sample()],
      links: {
        next: nextCollectionLink,
      },
    }),
    key: 'discoverCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.discoverCollections.links.next).toEqual(nextCollectionLink);
});

test('appending mycollections', () => {
  const stateBefore: CollectionsStateValue = {
    collections: {},
    updating: false,
    loading: false,
    myCollections: PageableCollectionsFactory.sample(),
    discoverCollections: undefined,
    publicCollections: undefined,
    bookmarkedCollections: undefined,
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendPageableCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: [VideoCollectionFactory.sample()],
      links: {
        next: nextCollectionLink,
      },
    }),
    key: 'myCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.myCollections.links.next).toEqual(nextCollectionLink);
});
