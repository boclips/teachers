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
import { fetchPublicCollectionsAction } from '../redux/actions/fetchPublicCollectionsAction';
import PublicCollectionsGrid from './PublicCollectionsGrid';

const mockStore = configureStore<CollectionState & RouterState & LinksState>();

test('dispatches fetch public collection if none when mounted', () => {
  const store = mockStore({
    links: LinksFactory.sample(),
    // @ts-ignore
    collections: {},
    // @ts-ignore
    router: { location: { search: '' } },
  });

  mount(
    <Provider store={store}>
      <PublicCollectionsGrid numberOfCollections={1} description="" />
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(fetchPublicCollectionsAction());
});

test('dispatches does not fetch public collection if some when mounted', () => {
  const store = mockStore({
    links: LinksFactory.sample(),
    // @ts-ignore
    collections: { publicCollections: [VideoCollectionFactory.sample()] },
    // @ts-ignore
    router: { location: { search: '' } },
  });

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <PublicCollectionsGrid numberOfCollections={1} description="" />
      </MemoryRouter>
    </Provider>,
  );

  expect(store.getActions()).toHaveLength(0);
});
