import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { LinksFactory, VideoFactory } from '../../../test-support/factories';
import { LinksState, VideoDetailsState } from '../../State';
import VideoDetailsView, { fetchVideoAction } from './VideoDetailsView';

const mockStore = configureStore<VideoDetailsState & LinksState>();

test('dispatches FETCH_VIDEO when mounted', () => {
  const store = mockStore({
    video: { loading: false, item: null },
    links: LinksFactory.sample(),
  });

  mount(
    <Provider store={store}>
      <VideoDetailsView videoId="123" />
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(fetchVideoAction('123'));
});

test('renders video details when the video has loaded', () => {
  const store = mockStore({
    video: { loading: false, item: VideoFactory.sample() },
    links: LinksFactory.sample(),
  });

  const wrapper = mount(
    <Provider store={store}>
      <VideoDetailsView videoId="123" />
    </Provider>,
  );

  expect(wrapper.find(By.dataQa('video-details'))).toExist();
  expect(wrapper.find(By.dataQa('video-title'))).toHaveText('my video title');
  expect(wrapper.find(By.dataQa('video-description'))).toHaveText(
    'my video description',
  );
  expect(wrapper.find(By.dataQa('video-content-provider'))).toHaveText(
    'Bodevs Productions',
  );
  expect(wrapper.find(By.dataQa('video-duration'))).toHaveText(' 2m 0s');
  expect(wrapper.find(By.dataQa('video-released-on'))).toHaveText(
    'Jun 20, 2018',
  );
  expect(wrapper.find(By.dataQa('video-thumbnail'))).toHaveProp(
    'src',
    'http://cdn.kaltura.com/thumbnail.jpg',
  );
});
