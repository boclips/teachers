import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { RouterActionType } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { findAll, findOne } from '../../../test-support/enzymeHelpers';
import { LinksFactory, VideoFactory } from '../../../test-support/factories';
import { LinksState, RouterState, SearchState } from '../../State';
import VideoPlayer from '../components/VideoPlayer';
import { Video } from '../Video';
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

test('shows search results when there are any', () => {
  const video1: Video = VideoFactory.sample({ title: 'first video title' });
  const video2: Video = VideoFactory.sample({ title: 'second video title' });
  const store = createStore('donuts');
  store.search.videos = [video1, video2];

  const results = findAll(mountWith(mockStore(store)), 'search-result');
  expect(results).toHaveLength(2);

  const firstVideo = results.at(0);
  expect(findOne(firstVideo, 'video-title')).toHaveText('first video title');
  expect(firstVideo.find(VideoPlayer)).toHaveProp('searchId', 's123');
});

test('shows total count of videos', () => {
  const store = mockStore(createStore('donuts'));
  const wrapper = mountWith(store);
  expect(wrapper.find(By.dataQa('search-count'))).toHaveText('1111');
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
  };
}
