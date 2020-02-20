import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../test-support/factories';
import FakeBoclipsAnalytics from '../../../services/analytics/boclips/FakeBoclipsAnalytics';
import { noOp } from '../../../utils';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { Props, VideoCard } from './VideoCard';

const video = VideoFactory.sample();

const getWrapper = (givenProps: Partial<Props> = {}) => {
  const props: Props = {
    video,
    history: {
      push: noOp,
    } as any,
    ...givenProps,
  } as any;
  return shallow(<VideoCard {...props} />);
};

describe('when outside video collection', () => {
  it('renders video buttons', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(VideoButtons)).toExist();
  });
});

it('Renders a ClickableCard, with the video details href', () => {
  const wrapper = getWrapper();

  const card = wrapper.find(ClickableCard);

  expect(card).toExist();
  expect(card.props().href).toEqual('/videos/123');
});

it('logs a navigation event in BoclipsAnalytics on mousedown', () => {
  const wrapper = getWrapper();

  wrapper.simulate('mouseDown', {});

  expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
    video,
    interactionType: 'NAVIGATE_TO_VIDEO_DETAILS',
  });
});
