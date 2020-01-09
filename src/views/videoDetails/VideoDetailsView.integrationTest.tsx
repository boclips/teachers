import React from 'react';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduceReducers from 'reduce-reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { Router } from 'react-router';
import { video177 } from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import { VideoDetailsPage } from '../../../test-support/page-objects/VideoDetailsPage';
import {
  CollectionsFactory,
  EntitiesFactory,
  LinksFactory,
  RouterFactory,
  UserProfileFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../test-support/factories';
import { createReducer } from '../../app/redux/createReducer';
import { videoHandlers } from '../../components/video/redux/reducers/videoReducer';
import {
  renderWithCreatedStore,
  renderWithStore,
} from '../../../test-support/renderWithStore';
import State from '../../types/State';
import VideoDetailsView from './VideoDetailsView';

const collection = VideoCollectionFactory.sample({
  id: 'collection-id',
});

const initialState = {
  entities: EntitiesFactory.sample({
    videos: {
      byId: {
        'video-id': VideoFactory.sample({
          id: 'video-id',
          title: 'My Test Video',
          description: 'Video description',
        }),
      },
    },
    collections: {
      byId: { 'collection-id': collection },
    },
  }),
  collections: CollectionsFactory.sample({
    myCollections: { items: [collection.id], links: {} },
  }),
  videos: {
    promotedVideoIds: ['video-id'],
  },
  router: RouterFactory.sample(),
  links: LinksFactory.sample(),
};

// TODO(AG/EV) - lot of repetition in these tests

describe(`Video details view`, () => {
  it('video details shows data', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo({ video: video177 })
      .fetchCollections();

    const videoDetailsPage = await VideoDetailsPage.load();

    expect(videoDetailsPage.getVideoDetails()).toEqual({
      title: video177.title,
      description: video177.description,
      createdBy: video177.createdBy,
      duration: ' 1m 2s',
      releasedOn: 'Feb 11, 2018',
      subjects: ['Maths', 'Physics'],
      playerVideoId: video177.id,
    });
  });

  it('generates the URL for a video details page with the referer set to the user id', async () => {
    const history = createBrowserHistory();

    const authenticatedState = {
      authentication: {
        status: 'authenticated',
      },
      user: UserProfileFactory.sample({ id: 'user-test-id' }),
      ...initialState,
    };
    const store = createStore(
      reduceReducers(
        combineReducers({ router: connectRouter(history) }),
        createReducer(...videoHandlers),
      ),
      authenticatedState,
      applyMiddleware(routerMiddleware(history)),
    );

    const context = renderWithStore(
      <Provider store={store}>
        <Router history={history}>
          <VideoDetailsView videoId={'video-id'} />
        </Router>
      </Provider>,
    );

    await context.findByText('My Test Video');

    await wait(() => {
      if (history.location.search !== '?referer=user-test-id') {
        throw Error();
      }
    });
  });

  it('generates the URL for a video details page when the referer is anonymous', async () => {
    const history = createMemoryHistory({});

    const anonymousState: Partial<State> = {
      ...initialState,
      authentication: { status: 'anonymous' },
    };

    const store = createStore(
      reduceReducers(
        combineReducers({ router: connectRouter(history) }),
        createReducer(...videoHandlers),
      ),
      anonymousState,
      applyMiddleware(routerMiddleware(history)),
    );

    const context = renderWithCreatedStore(
      <VideoDetailsView videoId={'video-id'} />,
      store,
      history,
    );

    await context.findByText('My Test Video');

    await wait(() => {
      if (history.location.search !== '?referer=anonymous') {
        throw Error();
      }
    });
  });

  it(`doesn't override the referer id if it's already set`, async () => {
    const history = createMemoryHistory({});

    const anonymousState: Partial<State> = {
      ...initialState,
      authentication: { status: 'anonymous' },
    };

    history.push({
      search: `?referer=user-id-1`,
    });

    const store = createStore(
      reduceReducers(
        combineReducers({ router: connectRouter(history) }),
        createReducer(...videoHandlers),
      ),
      anonymousState,
      applyMiddleware(routerMiddleware(history)),
    );

    const context = renderWithCreatedStore(
      <VideoDetailsView videoId={'video-id'} />,
      store,
      history,
    );

    await context.findByText('My Test Video');

    await wait(() => {
      console.log(history.location.search);
      if (history.location.search !== '?referer=user-id-1') {
        throw Error();
      }
    });
  });

  it(`overwrites the existing referer id if user is authenticated`, async () => {
    const history = createMemoryHistory({});

    const authenticatedState = {
      authentication: {
        status: 'authenticated',
      },
      user: UserProfileFactory.sample({ id: 'user-test-id' }),
      ...initialState,
    };

    history.push({
      search: `?referer=user-id-1`,
    });

    const store = createStore(
      reduceReducers(
        combineReducers({ router: connectRouter(history) }),
        createReducer(...videoHandlers),
      ),
      authenticatedState,
      applyMiddleware(routerMiddleware(history)),
    );

    const context = renderWithCreatedStore(
      <VideoDetailsView videoId={'video-id'} />,
      store,
      history,
    );

    await context.findByText('My Test Video');

    await wait(() => {
      if (history.location.search !== '?referer=user-test-id') {
        throw Error();
      }
    });
  });
});
