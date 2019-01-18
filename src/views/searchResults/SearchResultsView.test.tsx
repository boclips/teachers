import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { RouterActionType } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { LinksFactory } from '../../../test-support/factories';
import { LinksState, RouterState, SearchState } from '../../types/State';
import SearchResultsView from './SearchResultsView';

test('shows placeholders when results are loading', () => {
  const store = mockStore(createStore('donuts', true));
  const wrapper = mountWith(store);

  const placeholders = wrapper.find(By.dataQa('search-results-placeholders'));

  expect(placeholders).toExist();
});

test('shows a no results message when there are zero search results', () => {
  const store = mockStore(createStore('donuts'));
  const wrapper = mountWith(store);

  const message = wrapper.find(By.dataQa('search-zero-results'));

  expect(message).toHaveText(
    'Oops, we couldn’t find any results that matched your search for donuts',
  );
});

test('does not show a no results message when search query is empty', () => {
  const store = mockStore(createStore(''));
  const wrapper = mountWith(store);

  const message = wrapper.find(By.dataQa('search-zero-results'));

  expect(message).not.toExist();
});

const mockStore = configureStore<SearchState & LinksState & RouterState>();

function onPageChange() {}

function mountWith(store: Store) {
  return mount(
    <Provider store={store}>
      <SearchResultsView onPageChange={onPageChange} />
    </Provider>,
  );
}

function createStore(query: string, isLoading = false) {
  return {
    links: LinksFactory.sample(),
    search: {
      videos: [],
      loading: isLoading,
      query,
      searchId: 's123',
      paging: {
        totalElements: 1111,
        totalPages: 0,
        number: 0,
        size: 10,
      },
    },
    router: {
      location: {
        pathname: '',
        search: `?q=${query}`,
        hash: '',
        state: null,
      },
      action: 'PUSH' as RouterActionType,
    },
    videoCollection: {
      videos: [],
    },
  };
}
