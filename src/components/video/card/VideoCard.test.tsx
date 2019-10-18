import { Card } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../test-support/factories';
import FakeBoclipsAnalytics from '../../../services/analytics/boclips/FakeBoclipsAnalytics';
import { noOp } from '../../../utils';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { Props, VideoCardForRouter } from './VideoCard';

const video = VideoFactory.sample();

const pushSpy = jest.fn();
const getWrapper = (givenProps: Partial<Props> = {}) => {
  const props: Props = {
    video,
    history: {
      push: noOp,
    } as any,
    ...givenProps,
    userId: givenProps.userId || null,
  } as any;
  return shallow(<VideoCardForRouter {...props} />);
};

describe('when outside video collection', () => {
  it('renders video buttons', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(VideoButtons)).toExist();
  });
});

describe('clicking the card', () => {
  it('navigates to the video details page', () => {
    const wrapper = getWrapper({
      history: {
        push: pushSpy,
      } as any,
    });

    wrapper.find(Card).simulate('click', {});

    expect(pushSpy).toHaveBeenCalledWith('/videos/123');
  });

  it('opens in a new tab when control is held', () => {
    const wrapper = getWrapper();

    wrapper.find(Card).simulate('click', { ctrlKey: true });

    expect(window.open).toHaveBeenCalledWith('/videos/123');
  });
  it('opens in a new tab when command (mac) is held', () => {
    const wrapper = getWrapper();

    wrapper.find(Card).simulate('click', { metaKey: true });

    expect(window.open).toHaveBeenCalledWith('/videos/123');
  });

  it('logs a navigation event in BoclipsAnalytics on mousedown', () => {
    const wrapper = getWrapper();

    wrapper.find(Card).simulate('mouseDown', {});

    expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
      video,
      interactionType: 'NAVIGATE_TO_VIDEO_DETAILS',
    });
  });
});
