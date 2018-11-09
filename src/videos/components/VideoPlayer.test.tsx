import { BoclipsPlayer } from 'boclips-react-player';
import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../test-support/factories';
import { VideoPlayer } from './VideoPlayer';

test('configures event tracker', () => {
  const video = VideoFactory.sample({ id: 'video-id' });

  const wrapper = shallow(
    <VideoPlayer
      trackingEndpoint={'https://bla.bla/bla'}
      video={video}
      searchId={'search-id'}
    />,
  );

  const boclipsPlayer = wrapper.find(BoclipsPlayer);

  const trackerConfig = boclipsPlayer.prop('trackerConfig');

  expect(trackerConfig.eventExtraData.searchId).toEqual('search-id');
  expect(trackerConfig.eventExtraData.videoId).toEqual('video-id');
});
