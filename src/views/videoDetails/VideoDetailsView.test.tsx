import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { By } from '../../../test-support/By';
import {
  LinksFactory,
  MockStoreFactory,
  VideoFactory,
} from '../../../test-support/factories';
import VideoPlayer from '../../components/video/player/VideoPlayer';
import VideoDetailsView, { fetchVideoAction } from './VideoDetailsView';

test('dispatches FETCH_VIDEO when mounted', () => {
  const store = MockStoreFactory.sample({
    video: { loading: false, item: null },
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

test('renders video details when the video has loaded', () => {
  const video = VideoFactory.sample();
  const store = MockStoreFactory.sample({
    video: { loading: false, item: video },
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
  expect(wrapper.find(By.dataQa('video-source'))).toHaveText(
    'Bodevs Productions',
  );
  expect(wrapper.find(By.dataQa('video-duration'))).toHaveText(' 2m 0s');
  expect(wrapper.find(By.dataQa('video-released-on'))).toHaveText(
    'Jun 20, 2018',
  );
  expect(wrapper.find(VideoPlayer)).toHaveProp('video', video);
});
