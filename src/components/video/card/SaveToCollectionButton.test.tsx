import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { addToDefaultCollectionAction } from '../../collection/redux/actions/addToDefaultCollectionAction';
import { removeFromDefaultCollectionAction } from '../../collection/redux/actions/removeFromDefaultCollectionAction';
import VideoPreviewButtonsContainer from './SaveToCollectionButton';
import VideoCollectionButton from './videoCollectionButton/VideoCollectionButton';

const mockStore = configureStore<{}>();

const video = VideoFactory.sample();

let store: MockStore<{}> = null;
let wrapper: ReactWrapper = null;

beforeEach(() => {
  store = mockStore({ videoCollection: VideoCollectionFactory.sample() });
  wrapper = mount(
    <Provider store={store}>
      <VideoPreviewButtonsContainer video={video} style="search" />
    </Provider>,
  );
});

test('dispatches when add to collection clicked', () => {
  wrapper
    .find(VideoCollectionButton)
    .props()
    .onAddToDefaultCollection();

  expect(store.getActions()).toContainEqual(
    addToDefaultCollectionAction(video),
  );
});

test('dispatches when remove from collection clicked', () => {
  wrapper
    .find(VideoCollectionButton)
    .props()
    .onRemoveFromDefaultCollection();

  expect(store.getActions()).toContainEqual(
    removeFromDefaultCollectionAction(video),
  );
});
