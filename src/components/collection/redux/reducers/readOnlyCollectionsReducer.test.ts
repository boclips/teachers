import {
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from '../../../../../test-support/factories';
import { Link } from '../../../../types/Link';
import { CollectionsStateValue } from '../../../../types/State';
import {
  appendBookmarkedCollectionsAction,
  appendPublicCollectionsAction,
} from '../actions/appendReadOnlyCollectionsAction';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { collectionsReducer } from './collectionsReducer';

test('appending bookmarked collections', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: PageableCollectionsFactory.sample({
      items: [collection],
    }),
    publicCollections: undefined,
    bookmarkedCollections: PageableCollectionsFactory.sample(),
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendBookmarkedCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: stateBefore.myCollections.items,
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
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    myCollections: PageableCollectionsFactory.sample({
      items: [collection],
    }),
    publicCollections: PageableCollectionsFactory.sample(),
    bookmarkedCollections: undefined,
  };

  const nextCollectionLink = new Link({
    href: 'next',
    templated: false,
  });

  const action = appendPublicCollectionsAction({
    collections: PageableCollectionsFactory.sample({
      items: stateBefore.myCollections.items,
      links: {
        next: nextCollectionLink,
      },
    }),
    key: 'publicCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.publicCollections.links.next).toEqual(nextCollectionLink);
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
});
