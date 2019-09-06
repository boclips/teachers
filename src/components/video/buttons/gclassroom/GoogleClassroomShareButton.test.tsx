import { Button } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../../test-support/factories';
import FakeBoclipsAnalytics from '../../../../services/analytics/boclips/FakeBoclipsAnalytics';
import { GoogleClassroomShareButton } from './GoogleClassroomShareButton';

it('opens a new window with the correct url', () => {
  (window as any).open = jest.fn();

  const wrapper = shallow(
    <GoogleClassroomShareButton
      video={VideoFactory.sample({ title: 'a video title', id: '123' })}
    />,
  );

  wrapper.find(Button).simulate('click');

  expect((global as any).open).toHaveBeenCalledWith(
    'https://classroom.google.com/u/0/share?url=http%3A%2F%2Flocalhost%2Fvideos%2F123&title=a%20video%20title',
    '_blank',
    'height=570,width=520',
  );
});

it('triggers a Boclips event', () => {
  const video = VideoFactory.sample({ title: 'a video title', id: '123' });
  const wrapper = shallow(<GoogleClassroomShareButton video={video} />);

  wrapper.find(Button).simulate('click');

  expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
    video,
    interactionType: 'VIDEO_SHARED_TO_GOOGLE_CLASSROOM',
  });
});
