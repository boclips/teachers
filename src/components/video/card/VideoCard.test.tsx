import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';
import { VideoFactory } from '../../../../test-support/factories';
import FakeBoclipsAnalytics from '../../../services/analytics/boclips/FakeBoclipsAnalytics';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { Props, VideoCardForRouter } from './VideoCard';

const video = VideoFactory.sample();

const getWrapper = (givenProps: Partial<Props> = {}) => {
  const props: Props = {
    video,
    ...givenProps,
    userId: givenProps.userId || null,
  };
  return shallow(<VideoCardForRouter {...props} />);
};

describe('when outside video collection', () => {
  test('renders video buttons', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(VideoButtons)).toExist();
  });
});

test('Logs card navigation clicks in BoclipsAnalytics', () => {
  const wrapper = getWrapper();

  wrapper.find(Link).simulate('mouseDown');

  expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
    video,
    interactionType: 'NAVIGATE_TO_VIDEO_DETAILS',
  });
});
