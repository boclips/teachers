import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../test-support/factories';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { Props, VideoCardForRouter } from './VideoCard';

const getWrapper = (givenProps: Partial<Props> = {}) => {
  const props: Props = {
    video: VideoFactory.sample(),
    ...givenProps,
  };
  return shallow(<VideoCardForRouter {...props} />);
};

describe('when outside video collection', () => {
  test('renders video buttons', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(VideoButtons)).toExist();
  });

  test('it does not render subject tags container if there are none on the video', () => {
    const video = VideoFactory.sample({ subjects: [] });
    const wrapper = getWrapper({ video });

    expect(wrapper.find('.subjects-container')).toHaveLength(0);
  });

  test('renders subject tags container if there are some on the video', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.subjects-container')).toHaveLength(1);
  });

  test('it does not render best for tags container if there is none on the video', () => {
    const video = VideoFactory.sample({ bestFor: null });
    const wrapper = getWrapper({ video });

    expect(wrapper.find('.best-for-container')).toHaveLength(0);
  });

  test('renders subject tags container if there are some on the video', () => {
    const video = VideoFactory.sample({ bestFor: 'Hook' });
    const wrapper = getWrapper({ video });

    expect(wrapper.find('.best-for-container')).toHaveLength(1);
  });
});
