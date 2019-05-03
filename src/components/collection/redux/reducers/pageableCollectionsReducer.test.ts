import { PageableCollectionsFactory } from '../../../../../test-support/factories';
import { Link } from '../../../../types/Link';
import { CollectionsStateValue } from '../../../../types/State';
import { appedPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { VideoCollectionFactory } from './../../../../../test-support/factories';
import { collectionsReducer } from './collectionsReducer';

test('appending bookmarked collections', () => {
  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: undefined,
    publicCollections: undefined,
    bookmarkedCollections: PageableCollectionsFactory.sample(),
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appedPageableCollectionsAction({
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
    updating: false,
    loading: false,
    myCollections: undefined,
    publicCollections: PageableCollectionsFactory.sample(),
    bookmarkedCollections: undefined,
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appedPageableCollectionsAction({
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

test('appending mycollections', () => {
  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: PageableCollectionsFactory.sample(),
    publicCollections: undefined,
    bookmarkedCollections: undefined,
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appedPageableCollectionsAction({
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
