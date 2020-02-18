import { mount } from 'enzyme';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { VideoFactory } from 'test-support/factories';
import FakeBoclipsAnalytics from 'src/services/analytics/boclips/FakeBoclipsAnalytics';
import CopyLinkButton from './CopyLinkButton';

it('sets video link', () => {
  const wrapper = mount(
    <CopyLinkButton
      video={VideoFactory.sample()}
      segment={{ start: 1, end: 5 }}
      userId={'userId'}
    />,
  );

  const copyToClipboard = wrapper.find(CopyToClipboard);
  expect(copyToClipboard.prop('text')).toContain('referer=userId');
  expect(copyToClipboard.prop('text')).toContain('segmentStart=1');
  expect(copyToClipboard.prop('text')).toContain('segmentEnd=5');
});

test('logs a boclips event when copied', () => {
  const video = VideoFactory.sample();
  const wrapper = mount(
    <CopyLinkButton video={video} segment={null} userId={null} />,
  );

  (wrapper.find(CopyToClipboard).prop('onCopy') as any)();

  expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
    video,
    interactionType: 'VIDEO_LINK_COPIED',
  });
});
