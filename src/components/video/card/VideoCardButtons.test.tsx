import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import { VideoFactory } from '../../../../test-support/factories';
import VideoPreviewButtonsContainer, {
  addToDefaultCollectionAction,
  removeFromDefaultCollectionAction,
} from './VideoCardButtons';
import VideoPreviewDefaultCollectionButton from './VideoDefaultCollectionButton';

const mockStore = configureStore<{}>();

const video = VideoFactory.sample();

let store: MockStore<{}> = null;
let wrapper: ReactWrapper = null;

beforeEach(() => {
  store = mockStore({});
  wrapper = mount(
    <Provider store={store}>
      <VideoPreviewButtonsContainer
        video={video}
        isInCollection={true}
        style="search"
      />
    </Provider>,
  );
});

test('dispatches when add to collection clicked', () => {
  wrapper
    .find(VideoPreviewDefaultCollectionButton)
    .props()
    .onAddToDefaultCollection();

  expect(store.getActions()).toContainEqual(
    addToDefaultCollectionAction(video),
  );
});

test('dispatches when remove from collection clicked', () => {
  wrapper
    .find(VideoPreviewDefaultCollectionButton)
    .props()
    .onRemoveFromDefaultCollection();

  expect(store.getActions()).toContainEqual(
    removeFromDefaultCollectionAction(video),
  );
});
