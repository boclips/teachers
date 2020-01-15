import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reduceReducers from 'reduce-reducers';
import { By } from '../../../test-support/By';
import {
  CollectionsFactory,
  EntitiesFactory,
  LinksFactory,
  MockStoreFactory,
  RouterFactory,
  UserProfileFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../test-support/factories';
import VideoPlayer from '../../components/video/player/VideoPlayer';
import { fetchVideoAction } from '../../components/video/redux/actions/fetchVideoAction';
import {
  renderWithCreatedStore,
  renderWithStore,
} from '../../../test-support/renderWithStore';
import { createReducer } from '../../app/redux/createReducer';
import { videoHandlers } from '../../components/video/redux/reducers/videoReducer';
import { VideoDetailsView } from './VideoDetailsView';

it('dispatches FETCH_VIDEO when mounted', () => {
  const store = MockStoreFactory.sample({
    video: { loading: false, id: null },
    links: LinksFactory.sample(),
  });

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <VideoDetailsView videoId="123" />
      </MemoryRouter>
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(fetchVideoAction('123'));
});

it('renders video details when the video has loaded', () => {
  const video = VideoFactory.sample();
  const store = MockStoreFactory.sample({
    entities: EntitiesFactory.sample({
      videos: { byId: { [video.id]: video } },
    }),
    video: { loading: false, id: VideoIdFactory.sample({ value: video.id }) },
    links: LinksFactory.sample(),
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <VideoDetailsView videoId="123" />
      </MemoryRouter>
    </Provider>,
  );

  expect(wrapper.find(By.dataQa('video-details'))).toExist();
  expect(wrapper.find(By.dataQa('video-title'))).toHaveText('my video title');
  expect(wrapper.find(By.dataQa('video-description'))).toHaveText(
    'my video description',
  );
  expect(wrapper.find(By.dataQa('video-created-by'))).toHaveText(
    'Bodevs Productions',
  );
  expect(wrapper.find(By.dataQa('video-duration'))).toHaveText(' 2m 0s');
  expect(wrapper.find(By.dataQa('video-released-on'))).toHaveText(
    'Jun 20, 2018',
  );
  expect(wrapper.find(VideoPlayer)).toHaveProp('video', video);
});

it(`displays the sharecode modal for a shared video`, async () => {
  const history = createMemoryHistory({
    initialEntries: ['/videos/123?referer=user-123&share=true'],
  });

  const initialState = {
    entities: EntitiesFactory.sample({
      videos: {
        byId: {
          '123': VideoFactory.sample({
            id: '123',
            title: 'My Test Video',
            description: 'Video description',
          }),
        },
      },
      collections: {
        byId: {},
      },
    }),
    collections: CollectionsFactory.sample(),
    videos: {
      promotedVideoIds: ['video-id'],
    },
    router: RouterFactory.sample(),
    links: LinksFactory.sample(),
    authentication: {
      status: 'anonymous',
    },
  };

  const store = createStore(
    reduceReducers(
      combineReducers({ router: connectRouter(history) }),
      createReducer(...videoHandlers),
    ),
    initialState,
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
  expect(wrapper.getByText('Enter code to watch video')).toBeInTheDocument();
});

it(`does not show the sharecode modal for a logged in user`, async () => {
  const history = createMemoryHistory({
    initialEntries: ['/videos/123?referer=user-123&share=true'],
  });

  const initialState = {
    entities: EntitiesFactory.sample({
      videos: {
        byId: {
          '123': VideoFactory.sample({
            id: '123',
            title: 'My Test Video',
            description: 'Video description',
          }),
        },
      },
      collections: {
        byId: {},
      },
    }),
    collections: CollectionsFactory.sample(),
    videos: {
      promotedVideoIds: ['video-id'],
    },
    router: RouterFactory.sample(),
    links: LinksFactory.sample(),
    user: UserProfileFactory.sample(),
    authentication: {
      status: 'authenticated',
    },
  };

  const store = createStore(
    reduceReducers(
      combineReducers({ router: connectRouter(history) }),
      createReducer(...videoHandlers),
    ),
    initialState,
    applyMiddleware(routerMiddleware(history)),
  );
  const wrapper = renderWithCreatedStore(
    <VideoDetailsView videoId="123" />,
    store,
    history,
  );

  const button = wrapper.queryByText('Watch video');

  expect(button).not.toBeInTheDocument();
});

it(`does not require a sharecode for existing video links`, () => {
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

it(`does not render a share button when user is anonymous`, () => {
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

  expect(wrapper.queryByText('Share')).not.toBeInTheDocument();
});
