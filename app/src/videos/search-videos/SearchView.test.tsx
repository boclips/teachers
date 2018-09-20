import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { findAll, findOne, search } from '../../../test-support/enzymeHelpers';
import { VideoFactory } from '../../../test-support/factories';
import { SearchState } from '../../State';
import { Video } from '../Video';
import SearchView, { searchVideosAction } from './SearchView';

const mockStore = configureStore<SearchState>();

function mountWith(store: Store) {
  return mount(
    <Provider store={store}>
      <SearchView />
    </Provider>,
  );
}

test('dispatches an action with search query when search button clicked', () => {
  const store = mockStore({
    search: { videos: [], loading: false, query: '', searchId: 's123' },
  });
  const wrapper = mountWith(store);

  search(wrapper, 'china firewall');

  expect(store.getActions()).toContainEqual(
    searchVideosAction('china firewall'),
  );
});

test('shows placeholders when results are loading', () => {
  const store = mockStore({
    search: { videos: [], loading: true, query: 'donuts', searchId: 's123' },
  });
  const wrapper = mountWith(store);

  const placeholders = wrapper.find(By.dataQa('search-results-placeholders'));

  expect(placeholders).toExist();
});

test('shows a no results message when there are zero search results', () => {
  const store = mockStore({
    search: { videos: [], loading: false, query: 'donuts', searchId: 's123' },
  });
  const wrapper = mountWith(store);

  const message = wrapper.find(By.dataQa('search-zero-results'));

  expect(message).toHaveText('Your search for donuts returned no results');
});

test('does not show a no results message when search query is empty', () => {
  const store = mockStore({
    search: { videos: [], loading: false, query: '', searchId: 's123' },
  });
  const wrapper = mountWith(store);

  const message = wrapper.find(By.dataQa('search-zero-results'));

  expect(message).not.toExist();
});

test('shows search results when there are any', () => {
  const video1: Video = VideoFactory.sample({ title: 'first video title' });
  const video2: Video = VideoFactory.sample({ title: 'second video title' });
  const store = mockStore({
    search: {
      videos: [video1, video2],
      loading: false,
      query: '',
      searchId: 's123',
    },
  });

  const results = findAll(mountWith(store), 'search-result');
  expect(results).toHaveLength(2);

  const firstVideo = results.at(0);
  expect(findOne(firstVideo, 'video-title')).toHaveText('first video title');
});
