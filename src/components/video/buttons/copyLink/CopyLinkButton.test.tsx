import { mount } from 'enzyme';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Provider } from 'react-redux';
import {
  MockStoreFactory,
  UserProfileFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import FakeBoclipsAnalytics from '../../../../services/analytics/boclips/FakeBoclipsAnalytics';
import CopyLinkButton from './CopyLinkButton';

it('adds id of logged in user as a query param', () => {
  const store = MockStoreFactory.sample({
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
  const store = MockStoreFactory.sample({
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

test('logs a boclips event when copied', () => {
  const store = MockStoreFactory.sample({
    user: null,
  });
  const video = VideoFactory.sample();
  const wrapper = mount(
    <Provider store={store}>
      <CopyLinkButton video={video} />
    </Provider>,
  );

  (wrapper.find(CopyToClipboard).prop('onCopy') as any)();

  expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
    video,
    interactionType: 'VIDEO_LINK_COPIED',
  });
});
