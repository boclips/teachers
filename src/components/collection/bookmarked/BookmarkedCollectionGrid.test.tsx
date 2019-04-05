import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import {
  LinksFactory,
  VideoCollectionFactory,
} from '../../../../test-support/factories';
import { CollectionState, LinksState, RouterState } from '../../../types/State';
import { fetchBookmarkedCollectionsAction } from '../redux/actions/fetchBookmarkedCollectionsAction';
import BookmarkedCollectionsGrid from './BookmarkedCollectionsGrid';

const mockStore = configureStore<CollectionState & RouterState & LinksState>();

test('dispatches fetch bookmarked collection if none when mounted', () => {
  const store = mockStore({
    links: LinksFactory.sample(),
    // @ts-ignore
    collections: {},
    // @ts-ignore
    router: { location: { search: '' } },
  });

  mount(
    <Provider store={store}>
      <BookmarkedCollectionsGrid maxNumberOfCollections={1} description="" />
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(fetchBookmarkedCollectionsAction());
});

test('dispatches does not fetch bookmarked collection if some when mounted', () => {
  const store = mockStore({
    links: LinksFactory.sample(),
    // @ts-ignore
    collections: {
      bookmarkedCollections: {
        items: [VideoCollectionFactory.sample()],
        links: {},
      },
    },
    // @ts-ignore
    router: { location: { search: '' } },
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
