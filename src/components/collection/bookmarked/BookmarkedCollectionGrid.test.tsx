import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import {
  CollectionsFactory,
  MockStoreFactory,
  VideoCollectionFactory,
} from '../../../../test-support/factories';
import { fetchBookmarkedCollectionsAction } from '../redux/actions/fetchBookmarkedCollectionsAction';
import BookmarkedCollectionsGrid from './BookmarkedCollectionsGrid';

test('dispatches fetch bookmarked collection if none when mounted', () => {
  const store = MockStoreFactory.sample({ collections: {} as any });

  mount(
    <Provider store={store}>
      <BookmarkedCollectionsGrid maxNumberOfCollections={1} description="" />
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(fetchBookmarkedCollectionsAction());
});

test('dispatches does not fetch bookmarked collection if some when mounted', () => {
  const store = MockStoreFactory.sample({
    collections: {
      ...CollectionsFactory.sample(),
      bookmarkedCollections: {
        items: [VideoCollectionFactory.sample()],
        links: {},
      },
    },
  });

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <BookmarkedCollectionsGrid maxNumberOfCollections={1} description="" />
      </MemoryRouter>
    </Provider>,
  );

  expect(store.getActions()).toHaveLength(0);
});
