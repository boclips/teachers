import { Button } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../../test-support/factories';
import FakeBoclipsAnalytics from '../../../../services/analytics/boclips/FakeBoclipsAnalytics';
import { GoogleClassroomShareButton } from './GoogleClassroomShareButton';

it('opens a new window with the correct url', () => {
  const open = jest.fn();
  (window as any).open = open;

  const wrapper = shallow(
    <GoogleClassroomShareButton
      video={VideoFactory.sample({ title: 'The title', id: '123' })}
      segment={{ start: 1999, end: 2999 }}
      userId={'bob'}
      shareCode={'ZXY1'}
    />,
  );

  wrapper.find(Button).simulate('click');

  expect(open).toHaveBeenCalledTimes(1);

  const [url, target, windowParams] = open.mock.calls[0];
  expect(url).toMatch(
    /https:\/\/classroom\.google\.com\/u\/0\/share\?url=.+&title=.+/,
  );
  expect(url).toContain('1999');
  expect(url).toContain('2999');
  expect(url).toContain('bob');
  expect(url).not.toContain('ZXY1');
  expect(target).toEqual('_blank');
  expect(windowParams).toEqual('height=570,width=520');
});

it('triggers a Boclips event', () => {
  const video = VideoFactory.sample({ title: 'a video title', id: '123' });
  const wrapper = shallow(
    <GoogleClassroomShareButton
      video={video}
      segment={null}
      userId="user123"
      shareCode="ZXY1"
    />,
  );

  wrapper.find(Button).simulate('click');

  expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
    video,
    interactionType: 'VIDEO_SHARED_TO_GOOGLE_CLASSROOM',
  });
});
