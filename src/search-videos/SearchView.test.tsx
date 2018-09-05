import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import { VideosState } from '../State';
import { findAll, findOne, search } from '../test-support/enzymeHelpers';
import SearchView, { searchVideosAction } from './SearchView';
import { Video } from './Video';

const mockStore = configureStore<VideosState>();

test('dispatches an action with search query when search button clicked', () => {
  const store = mockStore({ videos: { items: [], loading: false, query: '' } });
  const wrapper = mount(
    <Provider store={store}>
      <SearchView />
    </Provider>,
  );

  search(wrapper, 'china firewall');

  expect(store.getActions()).toContainEqual(
    searchVideosAction('china firewall'),
  );
});

test('displays search results', () => {
  const video1: Video = { title: 'first video title' };
  const video2: Video = { title: 'second video title' };
  const store = mockStore({
    videos: { items: [video1, video2], loading: false, query: '' },
  });

  const results = findAll(
    mount(
      <Provider store={store}>
        <SearchView />
      </Provider>,
    ),
    'search-result',
  );
  expect(results).toHaveLength(2);

  const firstVideo = results.at(0);
  expect(findOne(firstVideo, 'search-result-title')).toHaveText(
    'first video title',
  );
});
