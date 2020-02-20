import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../test-support/factories';
import VideoPreviewBadge from './VideoBadge';

test("renders nothing when there's no badge", () => {
  const video = VideoFactory.sample({ badges: [] });
  const wrapper = shallow(<VideoPreviewBadge video={video} />);

  expect(wrapper).toBeEmptyRender();
});

test('displays a Youtube badge', () => {
  const video = VideoFactory.sample({ badges: ['youtube'] });
  const wrapper = shallow(<VideoPreviewBadge video={video} />);

  expect(wrapper.find('.video-badge').prop('alt')).toEqual('YouTube');
});
