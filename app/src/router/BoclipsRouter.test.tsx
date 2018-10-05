import {
  RouterActionType,
  RouterState as ReactRouterState,
} from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  RouterState,
  SearchState,
  SearchStateValue,
  VideoDetailsState,
  VideoStateValue,
} from '../State';
import SearchResultsView from '../videos/search-videos/SearchResultsView';
import { VideoDetailsView } from '../videos/video-details/VideoDetailsView';
import { BoclipsRouter } from './BoclipsRouter';

const mockStore = configureStore<
  RouterState & VideoDetailsState & SearchState
>();

test('shows video details view on /videos/{id}', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Provider store={buildStoreWithPathAndQuery('/videos/123')}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  const videoDetailsView = wrapper.find(VideoDetailsView);
  expect(videoDetailsView).toExist();
  expect(videoDetailsView).toHaveProp('videoId', '123');
});

test('shows search results view on /videos', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Provider store={buildStoreWithPathAndQuery('/videos', 'q=earthquakes')}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  const videoDetailsView = wrapper.find(SearchResultsView);
  expect(videoDetailsView).toExist();
});

function buildStoreWithPathAndQuery(path: string, query: string = '') {
  const router: ReactRouterState = {
    location: {
      pathname: path,
      search: query,
      state: {},
      hash: '',
    },
    action: 'PUSH' as RouterActionType,
  };

  const video: VideoStateValue = {
    loading: false,
    item: null,
  };

  const search: SearchStateValue = {
    loading: false,
    query: '',
    searchId: '',
    videos: [],
  };

  const store = mockStore({
    router,
    video,
    search,
  });
  return store;
}
