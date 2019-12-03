import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { By } from '../../../test-support/By';
import {
  CollectionSearchFactory,
  MockStoreFactory,
  RouterFactory,
  SearchFactory,
  VideoSearchFactory,
} from '../../../test-support/factories';
import SearchResultsView from './SearchResultsView';

test('shows placeholders when results are loading', () => {
  const store = createStore('donuts', true);
  const wrapper = mountWith(store);

  const placeholders = wrapper.find(By.dataQa('search-results-placeholders'));

  expect(placeholders).toExist();
});

test('shows placeholders when collection results are loading, but videos have loaded', () => {
  const store = createStore('donuts', false, true);
  const wrapper = mountWith(store);

  const placeholders = wrapper.find(By.dataQa('search-results-placeholders'));

  expect(placeholders).toExist();
});

test('shows placeholders when videos results are loading, but collections have loaded', () => {
  const store = createStore('donuts', true, false);
  const wrapper = mountWith(store);

  const placeholders = wrapper.find(By.dataQa('search-results-placeholders'));

  expect(placeholders).toExist();
});

test('shows a no results message when there are zero search results', () => {
  const store = createStore('donuts');
  const wrapper = mountWith(store);

  const message = wrapper.find(By.dataQa('search-zero-results'));

  expect(message).toHaveText(
    'Oops, we couldn’t find any results that matched your search for donuts',
  );
});

test('does not show a no results message when search query is empty', () => {
  const store = createStore('');
  const wrapper = mountWith(store);

  const message = wrapper.find(By.dataQa('search-zero-results'));

  expect(message).not.toExist();
});

function mountWith(store: Store) {
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <SearchResultsView />
      </MemoryRouter>
    </Provider>,
  );
}

function createStore(
  query: string,
  videosAreLoading = false,
  collectionsAreLoading = false,
) {
  return MockStoreFactory.sample({
    search: SearchFactory.sample({
      videoSearch: {
        ...VideoSearchFactory.sample(),
        loading: videosAreLoading,
        query,
      },
      collectionSearch: {
        ...CollectionSearchFactory.sample(),
        loading: collectionsAreLoading,
        query,
      },
    }),
    router: {
      ...RouterFactory.sample(),
      location: {
        pathname: '',
        search: `?q=${query}`,
        hash: '',
        state: null,
      },
    },
  });
}
