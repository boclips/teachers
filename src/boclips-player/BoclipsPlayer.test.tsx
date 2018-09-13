import { mount, shallow } from 'enzyme';
import React from 'react';
import { By } from '../test-support/By';
import BoclipsPlayer from './BoclipsPlayer';
import { VideoPlayback } from './VideoPlayback';

test('it initially shows the thumbnail', () => {
  const wrapper = mount(
    <BoclipsPlayer thumbnail={'/static/thumb.jpg'} stream={'stream.mdp'} />,
  );
  const thumbnail = wrapper.find(By.dataQa('video-thumbnail'));

  expect(thumbnail).toExist();
  expect(thumbnail).toHaveProp('src', '/static/thumb.jpg');
  expect(wrapper.find(By.dataQa('video-playback', 'video'))).not.toExist();
});

test('on click on thumbnail shows video player', () => {
  const wrapper = shallow(
    <BoclipsPlayer
      thumbnail={'/static/thumb.jpg'}
      stream={'/static/stream.mdp'}
    />,
  );
  wrapper.find(By.dataQa('video-thumbnail')).simulate('click', {});

  expect(wrapper.find(VideoPlayback)).toExist();
  expect(wrapper.find(VideoPlayback)).toHaveProp(
    'stream',
    '/static/stream.mdp',
  );
  expect(wrapper.find(By.dataQa('video-thumbnail'))).not.toExist();
});
