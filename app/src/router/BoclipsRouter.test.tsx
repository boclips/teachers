import {
  RouterActionType,
  RouterState as ReactRouterState,
} from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { UserCredentials } from '../login/UserCredentials';
import {
  RouterState,
  SearchState,
  SearchStateValue,
  UserState,
  VideoDetailsState,
  VideoStateValue,
} from '../State';
import { SearchLayout } from '../videos/SearchLayout';
import { VideoDetailsView } from '../videos/video-details/VideoDetailsView';
import { BoclipsRouter } from './BoclipsRouter';

const mockStore = configureStore<
  UserState & RouterState & VideoDetailsState & SearchState
>();

test('shows video details view on /videos/{id}', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Provider store={buildStoreWithPath('/videos/123')}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  const videoDetailsView = wrapper.find(VideoDetailsView);
  expect(videoDetailsView).toExist();
});

test('shows video search view on /videos', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Provider store={buildStoreWithPath('/videos')}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  const videoDetailsView = wrapper.find(SearchLayout);
  expect(videoDetailsView).toExist();
});

function buildStoreWithPath(path: string) {
  const router: ReactRouterState = {
    location: {
      pathname: path,
      search: '',
      state: {},
      hash: '',
    },
    action: 'PUSH' as RouterActionType,
  };

  const user: UserCredentials = {
    username: 'John',
    password: 'j0hn',
    valid: true,
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
    user,
    video,
    search,
  });
  return store;
}
