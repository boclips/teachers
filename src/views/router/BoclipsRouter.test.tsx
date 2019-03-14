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
import ConnectedTabsContainer from '../../components/layout/tabs/TabsContainer';
import {
  CollectionState,
  LoginState,
  RouterState,
  SearchState,
  SearchStateValue,
  VideoDetailsState,
  VideoStateValue,
} from '../../types/State';
import CollectionListView from '../collection/CollectionListView';
import CollectionView from '../collection/CollectionView';
import HomeView from '../home/HomeView';
import LoggedOutView from '../loggedout/LoggedOutView';
import SearchResultsView from '../searchResults/SearchResultsView';
import VideoDetailsView from '../videoDetails/VideoDetailsView';
import BoclipsRouter from './BoclipsRouter';

const mockStore = configureStore<
  RouterState & VideoDetailsState & SearchState & LoginState & CollectionState
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

  test('shows navigation tabs on /videos', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/videos', 'q=earthquakes')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const tabs = wrapper.find(ConnectedTabsContainer);
    expect(tabs).toExist();
  });

  test('does not show navigation tabs on /videos', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/videos/123')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const tabs = wrapper.find(ConnectedTabsContainer);
    expect(tabs).not.toExist();
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

  test('shows collections view on /collections', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/collections')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(CollectionListView);
    expect(collectionsView).toExist();
  });

  test('shows default collection view on /collections/default', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/collections/default')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(CollectionView);
    expect(videoDetailsView).toExist();
  });

  test('does not show navigation tabs on /collections', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/collections/default')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const tabs = wrapper.find(ConnectedTabsContainer);
    expect(tabs).not.toExist();
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

  test('does not show collections view', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/collections', '', false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(CollectionListView);
    expect(collectionsView).not.toExist();
  });

  test('does not show default collection view', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/collections/default', '', false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(CollectionView);
    expect(videoDetailsView).not.toExist();
  });

  test('shows logged out page', () => {
    const history = createMemoryHistory();

    const wrapper = mount(
      <Provider store={buildStore('/bye')}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const loggedOutView = wrapper.find(LoggedOutView);
    expect(loggedOutView).toExist();
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
    videos: [],
    paging: {
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 10,
    },
  };

  let user = null;
  if (authorised) {
    user = Keycloak();
    user.authenticated = true;
  }

  const collections = { loading: true, updating: false, userCollections: [] };

  const store = mockStore({
    router,
    video,
    search,
    user,
    collections,
  });
  return store;
}
