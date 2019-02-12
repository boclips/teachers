import { BoclipsPlayer } from 'boclips-react-player';
import { PlaybackConfig } from 'boclips-react-player/dist/src/PlaybackConfig';
import { shallow } from 'enzyme';
import moment = require('moment');
import React from 'react';
import { VideoFactory } from '../../../../test-support/factories';
import { VideoPlayer } from './VideoPlayer';

test('configures event tracker', () => {
  const video = VideoFactory.sample({ id: 'video-id' });

  const wrapper = shallow(
    <VideoPlayer trackingEndpoint={'https://bla.bla/bla'} video={video} />,
  );

  const boclipsPlayer = wrapper.find(BoclipsPlayer);

  const trackerConfig = boclipsPlayer.prop('trackerConfig');

  expect(trackerConfig.eventExtraData.videoId).toEqual('video-id');
});

test('sets duration in playback', () => {
  const video = VideoFactory.sample({
    duration: moment.duration(2, 'minutes'),
  });

  const wrapper = shallow(
    <VideoPlayer video={video} trackingEndpoint={null} />,
  );

  const boclipsPlayer = wrapper.find(BoclipsPlayer);

  const playbackConfig: PlaybackConfig = boclipsPlayer.prop('playbackConfig');

  expect(playbackConfig.durationSeconds).toEqual(120);
});
