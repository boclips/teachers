import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../test-support/factories';
import { Video } from '../../../types/Video';
import VideoCardTagList from './VideoCardTagList';

const getWrapper = (givenProps: Partial<{ video: Video }> = {}) => {
  const props = {
    video: VideoFactory.sample(),
    ...givenProps,
  };
  return shallow(<VideoCardTagList {...props} />);
};

test('it does not render subject tags container if there are none on the video', () => {
  const video = VideoFactory.sample({ subjects: [] });
  const wrapper = getWrapper({ video });

  expect(wrapper.find('.tag-list__subjects-container')).toHaveLength(0);
});

test('renders subject tags container if there are some on the video', () => {
  const wrapper = getWrapper();
  expect(wrapper.find('.tag-list__subjects-container')).toHaveLength(1);
});

test('it does not render best for tags container if there is none on the video', () => {
  const video = VideoFactory.sample({ bestFor: null });
  const wrapper = getWrapper({ video });

  expect(wrapper.find('.tag-list__best-for-container')).toHaveLength(0);
});

test('renders subject tags container if there are some on the video', () => {
  const video = VideoFactory.sample({ bestFor: 'Hook' });
  const wrapper = getWrapper({ video });

  expect(wrapper.find('.tag-list__best-for-container')).toHaveLength(1);
});
