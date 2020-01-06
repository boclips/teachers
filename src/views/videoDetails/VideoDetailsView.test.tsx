import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { By } from '../../../test-support/By';
import {
  CollectionsFactory,
  EntitiesFactory,
  LinksFactory,
  MockStoreFactory,
  RouterFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../test-support/factories';
import VideoPlayer from '../../components/video/player/VideoPlayer';
import { fetchVideoAction } from '../../components/video/redux/actions/fetchVideoAction';
import { renderWithStore } from '../../../test-support/renderWithStore';
import VideoDetailsView from './VideoDetailsView';

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
  const wrapper = renderWithStore(<VideoDetailsView videoId={'123'} />, {
    initialState: {
      router: RouterFactory.sample({
        location: {
          search: '?shared=true',
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
    },
  });

  const button = wrapper.getByText('Watch video');

  expect(wrapper.getByRole('dialog')).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(wrapper.getByText('Enter code to watch video')).toBeInTheDocument();
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
    },
  });

  expect(wrapper.queryByRole('dialog')).not.toBeInTheDocument();
  expect(
    wrapper.queryByText('Enter code to watch video'),
  ).not.toBeInTheDocument();
});
