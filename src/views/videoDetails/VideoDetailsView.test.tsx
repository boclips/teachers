import { createBrowserHistory, createMemoryHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduceReducers from 'reduce-reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { wait, waitForElement } from '@testing-library/react';
import React from 'react';
import {
  renderWithCreatedStore,
  renderWithStore,
} from '../../../test-support/renderWithStore';
import {
  CollectionsFactory,
  EntitiesFactory,
  LinksFactory,
  MockStoreFactory,
  RouterFactory,
  UserProfileFactory,
  VideoFactory,
  VideoResourceFactory,
} from '../../../test-support/factories';
import { VideoDetailsPage } from '../../../test-support/page-objects/VideoDetailsPage';
import ApiStub from '../../../test-support/ApiStub';
import { videoHandlers } from '../../components/video/redux/reducers/videoReducer';
import { createReducer } from '../../app/redux/createReducer';
import State from '../../types/State';
import { createBoclipsStore } from '../../app/redux/store';
import { VideoDetailsView } from './VideoDetailsView';

describe('VideoDetailsView', () => {
  const initialState = MockStoreFactory.sampleState({
    links: LinksFactory.sample({}, 'https://api.example.com/v1'),
  });

  const video = VideoResourceFactory.sample({
    title: 'Video Title To Show',
    id: '123',
  });

  beforeEach(() => {
    new ApiStub()
      .defaultUser()
      .fetchVideo({ video })
      .fetchCollections();
  });

  it.skip('fetches video details from the API & renders the result', async () => {
    const videoDetailsPage = await VideoDetailsPage.load();

    expect(videoDetailsPage.getVideoDetails()).toEqual({
      title: video.title,
      description: video.description,
      createdBy: video.createdBy,
      duration: ' 1m 2s',
      releasedOn: 'Feb 11, 2018',
      subjects: ['Maths', 'Physics'],
      playerVideoId: video.id,
    });
  });

  describe('When unauthenticated', () => {
    const unauthenticatedState: Partial<State> = {
      ...initialState,
      authentication: {
        status: 'anonymous',
      },
    };

    it('asks for a code when "share" and "referer" params are present', () => {
      const history = createMemoryHistory({
        initialEntries: ['/videos/123?referer=user-123&share=true'],
      });

      const store = createStore(
        reduceReducers(
          combineReducers({ router: connectRouter(history) }),
          createReducer(...videoHandlers),
        ),
        unauthenticatedState,
        applyMiddleware(routerMiddleware(history)),
      );
      const wrapper = renderWithCreatedStore(
        <VideoDetailsView videoId="123" />,
        store,
        history,
      );

      const button = wrapper.getByText('Watch video');

      expect(wrapper.getByRole('dialog')).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(
        wrapper.getByText('Enter code to watch video'),
      ).toBeInTheDocument();
    });

    it('does not ask for a code when the "referer" param is missing', () => {
      const wrapper = renderWithStore(<VideoDetailsView videoId={'123'} />, {
        initialState: unauthenticatedState,
      });

      expect(wrapper.queryByRole('dialog')).not.toBeInTheDocument();
      expect(
        wrapper.queryByText('Enter code to watch video'),
      ).not.toBeInTheDocument();
    });
    it('does not ask for a code when the "share" param is missing', () => {
      const wrapper = renderWithStore(<VideoDetailsView videoId={'123'} />, {
        initialState: {
          router: RouterFactory.sample({
            location: {
              search: '?referer=user-id',
              pathname: '',
              hash: '',
              state: null,
            },
          }),
          links: LinksFactory.sampleAnonymous(),
          collections: CollectionsFactory.sample(),
          entities: EntitiesFactory.sample({
            videos: { byId: { '123': VideoFactory.sample() } },
          }),
          authentication: {
            status: 'anonymous',
          },
        },
      });

      expect(wrapper.queryByRole('dialog')).not.toBeInTheDocument();
      expect(
        wrapper.queryByText('Enter code to watch video'),
      ).not.toBeInTheDocument();
    });
    it('does not render a share button', () => {
      const wrapper = renderWithStore(<VideoDetailsView videoId={'123'} />, {
        initialState: {
          router: RouterFactory.sample({
            location: {
              search: '',
              pathname: '',
              hash: '',
              state: null,
            },
          }),
          links: LinksFactory.sampleAnonymous('https://api.example.com/v1'),
          collections: CollectionsFactory.sample(),
          entities: EntitiesFactory.sample({
            videos: { byId: { '123': VideoFactory.sample() } },
          }),
          authentication: {
            status: 'anonymous',
          },
        },
      });

      expect(wrapper.queryByText('Share')).not.toBeInTheDocument();
    });
    it('does not update the "referer" query param if it is set', async () => {
      const history = createMemoryHistory({});

      const anonymousState: Partial<State> = {
        ...initialState,
        authentication: { status: 'anonymous' },
        user: null,
      };

      history.push({
        search: `?referer=user-id-1`,
      });

      const store = createBoclipsStore(history, anonymousState);

      const context = renderWithCreatedStore(
        <VideoDetailsView videoId={video.id} />,
        store,
        history,
      );

      await context.findByText(video.title);

      await wait(() => {
        console.log(history.location.search);
        if (history.location.search !== '?referer=user-id-1') {
          throw Error();
        }
      });
    });
    it('adds an anonymous "referer" query param if it was missing', async () => {
      const history = createMemoryHistory({});

      const anonymousState: Partial<State> = {
        ...initialState,
        authentication: { status: 'anonymous' },
      };

      const store = createBoclipsStore(history, anonymousState);

      const context = renderWithCreatedStore(
        <VideoDetailsView videoId={video.id} />,
        store,
        history,
      );

      await context.findByText(video.title);

      await wait(() => {
        if (history.location.search.match(/referer=anonymous/)) {
          throw Error();
        }
      });
    });
  });

  describe('When authenticated', () => {
    it.todo('does render a share button');
    const authenticatedState = {
      ...initialState,
      authenticated: { status: 'authenticated' },
      user: UserProfileFactory.sample({ id: 'user-test-id' }),
    };

    it('does not ask for a code', async () => {
      const history = createMemoryHistory({
        initialEntries: ['/videos/123?referer=user-123&share=true'],
      });

      const store = createBoclipsStore(history, authenticatedState);

      const wrapper = renderWithCreatedStore(
        <VideoDetailsView videoId={video.id} />,
        store,
        history,
      );

      const title = await wrapper.findByText(video.title);

      expect(title).toBeInTheDocument();
      await expect(
        waitForElement(
          () => {
            wrapper.getByText('Watch video');
          },
          {
            timeout: (2 * 60) / 1000,
          },
        ),
      ).rejects.toBeTruthy();
    });

    it('sets the "referer" query param', async () => {
      const history = createBrowserHistory();

      const store = createBoclipsStore(history, authenticatedState);

      const context = renderWithStore(
        <Provider store={store}>
          <Router history={history}>
            <VideoDetailsView videoId={video.id} />
          </Router>
        </Provider>,
      );

      await context.findByText(video.title);

      await wait(() => {
        if (history.location.search !== '?referer=user-test-id') {
          throw Error();
        }
      });
    });
    it('sets overwrites the "referer" query param if it is already set', async () => {
      const history = createMemoryHistory({});

      history.push({
        search: `?referer=user-id-1`,
      });

      const store = createBoclipsStore(history, authenticatedState);

      const context = renderWithCreatedStore(
        <VideoDetailsView videoId={video.id} />,
        store,
        history,
      );

      await context.findByText(video.title);

      await wait(() => {
        if (history.location.search !== '?referer=user-test-id') {
          throw Error();
        }
      });
    });
  });
});
