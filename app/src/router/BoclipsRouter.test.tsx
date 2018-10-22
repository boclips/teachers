import {
  RouterActionType,
  RouterState as ReactRouterState,
} from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import Keycloak from 'keycloak-js';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  LoginState,
  RouterState,
  SearchState,
  SearchStateValue,
  VideoDetailsState,
  VideoStateValue,
} from '../State';
import HomeView from '../videos/HomeView';
import SearchResultsView from '../videos/search-videos/SearchResultsView';
import { VideoDetailsView } from '../videos/video-details/VideoDetailsView';
import BoclipsRouter from './BoclipsRouter';

const mockStore = configureStore<
  RouterState & VideoDetailsState & SearchState & LoginState
>();

test('shows video details view on /videos/{id}', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Provider store={buildStore('/videos/123')}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  const videoDetailsView = wrapper.find(VideoDetailsView);
  expect(videoDetailsView).toExist();
  expect(videoDetailsView).toHaveProp('videoId', '123');
});

describe('when authorised', () => {
  test('shows search results view on /videos', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/videos', 'q=earthquakes')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(SearchResultsView);
    expect(videoDetailsView).toExist();
  });

  test('shows home page on /', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(HomeView);
    expect(videoDetailsView).toExist();
  });
});

describe('when not authorised', () => {
  test('does not show search results view on /videos', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/videos', 'q=earthquakes', false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(SearchResultsView);
    expect(videoDetailsView).not.toExist();
  });

  test('does not show home page on /', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/', '', false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(HomeView);
    expect(videoDetailsView).not.toExist();
  });
});

function buildStore(
  path: string,
  query: string = '',
  authorised: boolean = true,
) {
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

  let login = null;
  if (authorised) {
    login = Keycloak();
    login.authenticated = true;
  }

  const store = mockStore({
    router,
    video,
    search,
    login,
  });
  return store;
}
