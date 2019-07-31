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
});
