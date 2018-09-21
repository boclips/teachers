import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { push } from 'connected-react-router';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { search } from '../../test-support/enzymeHelpers';
import { LinksFactory } from '../../test-support/factories';
import { LinksState, SearchState } from '../State';
import SearchLayout, { searchVideosAction } from './SearchLayout';

const mockStore = configureStore<SearchState & LinksState>();

function mountWith(store: Store) {
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/videos']}>
        <SearchLayout />
      </MemoryRouter>
    </Provider>,
  );
}

test('dispatches an action with search query when search button clicked', () => {
  const store = mockStore({
    search: { videos: [], loading: false, query: '', searchId: 's123' },
    links: LinksFactory.sample(),
  });
  const wrapper = mountWith(store);

  search(wrapper, 'china firewall');

  expect(store.getActions()).toContainEqual(
    searchVideosAction('china firewall'),
  );
});

test('re-routes when search button clicked', () => {
  const store = mockStore({
    search: { videos: [], loading: false, query: '', searchId: 's123' },
    links: LinksFactory.sample(),
  });
  const wrapper = mountWith(store);

  search(wrapper, 'china firewall');

  expect(store.getActions()).toContainEqual(push('/videos'));
});
