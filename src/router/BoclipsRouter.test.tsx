import {
  RouterActionType,
  RouterState as ReactRouterState,
} from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { UserCredentials } from '../login/UserCredentials';
import {
  RouterState,
  UserState,
  VideoDetailsState,
  VideoStateValue,
} from '../State';
import { VideoDetailsView } from '../videos/video-details/VideoDetailsView';
import { BoclipsRouter } from './BoclipsRouter';

const mockStore = configureStore<UserState & RouterState & VideoDetailsState>();

test('shows video details view on /videos/{id}', () => {
  const router: ReactRouterState = {
    location: {
      pathname: '/videos/123',
      search: '',
      state: {},
      hash: '',
    },
    action: 'PUSH' as RouterActionType,
  };

  const user: UserCredentials = {
    username: 'John',
    password: 'j0hn',
    valid: true,
  };

  const video: VideoStateValue = {
    loading: false,
    item: null,
  };

  const store = mockStore({
    router,
    user,
    video,
  });

  const history = createMemoryHistory();

  const wrapper = mount(
    <Provider store={store}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  const videoDetailsView = wrapper.find(VideoDetailsView);
  expect(videoDetailsView).toExist();
  expect(videoDetailsView).toHaveProp('videoId', '123');
});
