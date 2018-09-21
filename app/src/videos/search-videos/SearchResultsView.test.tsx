import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { findAll, findOne } from '../../../test-support/enzymeHelpers';
import { LinksFactory, VideoFactory } from '../../../test-support/factories';
import { LinksState, SearchState } from '../../State';
import VideoPlayer from '../components/VideoPlayer';
import { Video } from '../Video';
import SearchResultsView from './SearchResultsView';

const mockStore = configureStore<SearchState & LinksState>();

function mountWith(store: Store) {
  return mount(
    <Provider store={store}>
      <SearchResultsView />
    </Provider>,
  );
}

test('shows placeholders when results are loading', () => {
  const store = mockStore({
    search: { videos: [], loading: true, query: 'donuts', searchId: 's123' },
    links: LinksFactory.sample(),
  });
  const wrapper = mountWith(store);

  const placeholders = wrapper.find(By.dataQa('search-results-placeholders'));

  expect(placeholders).toExist();
});

test('shows a no results message when there are zero search results', () => {
  const store = mockStore({
    search: { videos: [], loading: false, query: 'donuts', searchId: 's123' },
    links: LinksFactory.sample(),
  });
  const wrapper = mountWith(store);

  const message = wrapper.find(By.dataQa('search-zero-results'));

  expect(message).toHaveText('Your search for donuts returned no results');
});

test('does not show a no results message when search query is empty', () => {
  const store = mockStore({
    search: { videos: [], loading: false, query: '', searchId: 's123' },
    links: LinksFactory.sample(),
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
    links: LinksFactory.sample(),
  });

  const results = findAll(mountWith(store), 'search-result');
  expect(results).toHaveLength(2);

  const firstVideo = results.at(0);
  expect(findOne(firstVideo, 'video-title')).toHaveText('first video title');
  expect(firstVideo.find(VideoPlayer)).toHaveProp('searchId', 's123');
});
