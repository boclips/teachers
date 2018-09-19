import { RouterActionType, RouterState } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { UserCredentials } from '../login/UserCredentials';
import { UserState } from '../State';
import { VideoDetailsView } from '../videos/video-details/VideoDetailsView';
import { BoclipsRouter } from './BoclipsRouter';

const mockStore = configureStore<UserState & { router: RouterState }>();

test('shows video details view on /videos/{id}', () => {
  const router: RouterState = {
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

  const store = mockStore({
    router,
    user,
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
