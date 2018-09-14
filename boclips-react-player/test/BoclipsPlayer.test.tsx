import { shallow } from 'enzyme';
import React from 'react';
import { By } from '../../test-support/By';
import { BoclipsPlayer } from '../src/BoclipsPlayer';
import { VideoPlayback } from '../src/VideoPlayback';

test('shows the thumbnail on load when thumbnail set', () => {
  const wrapper = shallow(
    <BoclipsPlayer thumbnail={'/static/thumb.jpg'} stream={'stream.mdp'} />,
  );
  const thumbnail = wrapper.find(By.dataQa('video-thumbnail'));

  expect(thumbnail).toExist();
  expect(thumbnail).toHaveProp('src', '/static/thumb.jpg');
  expect(wrapper.find(By.dataQa('video-playback', 'video'))).not.toExist();
});

test('shows video playback on load when thumbnail not set', () => {
  const wrapper = shallow(<BoclipsPlayer stream={'/static/stream.mdp'} />);

  expect(wrapper.find(VideoPlayback)).toExist();
  expect(wrapper.find(VideoPlayback)).toHaveProp(
    'stream',
    '/static/stream.mdp',
  );
  expect(wrapper.find(By.dataQa('video-thumbnail'))).not.toExist();
});

test('on click on thumbnail shows video playback', () => {
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
