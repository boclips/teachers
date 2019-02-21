import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import VideoPreviewButtonsContainer, {
  OwnProps,
} from './SaveToCollectionButton';
import { VideoCollectionRemoveButton } from './VideoCollectionRemoveButton';
import VideoCollectionToggleButton from './VideoCollectionToggleButton';

const mockStore = configureStore<{}>();

const videoInCollection = VideoFactory.sample();
const randomVideo = VideoFactory.sample();

let store: MockStore<{}> = null;

function render(props: Partial<OwnProps> = {}) {
  const defaultProps: OwnProps = {
    video: randomVideo,
    style: 'search',
  };
  store = mockStore({
    videoCollection: VideoCollectionFactory.sample({
      videos: [videoInCollection],
    }),
  });
  return mount(
    <Provider store={store}>
      <VideoPreviewButtonsContainer {...defaultProps} {...props} />
    </Provider>,
  );
}

it('Renders remove only button when in collection mode', () => {
  const wrapper = render({ video: randomVideo, style: 'collection' });

  expect(wrapper.find(VideoCollectionToggleButton)).not.toExist();
  expect(wrapper.find(VideoCollectionRemoveButton)).toExist();
});

it('Renders Video Collection management button when in search mode', () => {
  const wrapper = render({ video: videoInCollection, style: 'search' });

  expect(wrapper.find(VideoCollectionToggleButton)).toExist();
  expect(wrapper.find(VideoCollectionRemoveButton)).not.toExist();
});
