import { shallow } from 'enzyme';
import React from 'react';
import { Playback } from '../src/Playback';
import { Player } from '../src/Player';
import { By } from "./By";

test('shows the thumbnail on load when thumbnail set', () => {
  const wrapper = shallow(
    <Player thumbnail={'/static/thumb.jpg'} stream={'stream.mdp'} />,
  );
  const thumbnail = wrapper.find(By.dataQa('video-thumbnail'));

  expect(thumbnail).toExist();
  expect(thumbnail).toHaveProp('src', '/static/thumb.jpg');
  expect(wrapper.find(By.dataQa('video-playback', 'video'))).not.toExist();
});

test('shows video playback on load when thumbnail not set', () => {
  const wrapper = shallow(<Player stream={'/static/stream.mdp'} />);

  expect(wrapper.find(Playback)).toExist();
  expect(wrapper.find(Playback)).toHaveProp('stream', '/static/stream.mdp');
  expect(wrapper.find(By.dataQa('video-thumbnail'))).not.toExist();
});

test('on click on thumbnail shows video playback', () => {
  const wrapper = shallow(
    <Player thumbnail={'/static/thumb.jpg'} stream={'/static/stream.mdp'} />,
  );
  wrapper.find(By.dataQa('video-preview')).simulate('click', {});

  expect(wrapper.find(Playback)).toExist();
  expect(wrapper.find(Playback)).toHaveProp('stream', '/static/stream.mdp');
  expect(wrapper.find(By.dataQa('video-thumbnail'))).not.toExist();
});
