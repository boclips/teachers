import { mount } from 'enzyme';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  UserProfileFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { LoginState } from '../../../types/State';
import CopyLinkButton from './CopyLinkButton';

const mockStore = configureStore<LoginState>();

it('adds id of logged in user as a query param', () => {
  const store = mockStore({
    user: UserProfileFactory.sample({
      id: 'userId',
    }),
  });

  const wrapper = mount(
    <Provider store={store}>
      <CopyLinkButton video={VideoFactory.sample()} />
    </Provider>,
  );

  const copyToClipboard = wrapper.find(CopyToClipboard);
  expect(copyToClipboard.prop('text')).toContain('referer=userId');
});

test('does not add referer query param if no user', () => {
  const store = mockStore({
    user: null,
  });

  const wrapper = mount(
    <Provider store={store}>
      <CopyLinkButton video={VideoFactory.sample()} />
    </Provider>,
  );

  const copyToClipboard = wrapper.find(CopyToClipboard);

  expect(copyToClipboard.prop('text')).not.toContain('referer');
});
