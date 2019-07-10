import * as moment from 'moment';
import {
  video177,
  youtubeVideo1,
} from '../../../test-support/video-service-responses';
import { StreamPlayback, YoutubePlayback } from '../../types/Video';
import convertVideoResource from './convertVideoResource';

test('converts a video with stream playback', () => {
  const video = convertVideoResource(video177);

  expect(video.id).toEqual('177');
  expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
  expect(video.description).toEqual('Matthew Tosh shows us the science.');
  expect(video.duration).toEqual(moment.duration({ minutes: 1, seconds: 2 }));
  expect(video.releasedOn).toEqual(new Date('2018-02-11T10:12:33Z'));
  expect(video.rating).toEqual(3);
  expect(video.contentPartner).toEqual('cp1');
  expect(video.thumbnailUrl).toEqual('https://cdn.kaltura.com/thumbs/177.jpg');
  expect(video.subjects).toEqual(['Maths', 'Physics']);
  expect(video.playback instanceof StreamPlayback).toBeTruthy();
  expect((video.playback as StreamPlayback).getUrl()).toEqual(
    'https://cdn.kaltura.com/stream/147.mpd',
  );
  expect(video.badges).toEqual(['ad-free']);

  expect(video.links.rate.getOriginalLink()).toBeTruthy();
});

test('converts a video with youtube playback', () => {
  const video = convertVideoResource(youtubeVideo1);
  expect(video.id).toEqual('1');
  expect(video.title).toEqual('A youtube video');
  expect(video.description).toEqual('Matthew Tosh shows us the science.');
  expect(video.duration).toEqual(moment.duration({ minutes: 1, seconds: 2 }));
  expect(video.releasedOn).toEqual(new Date('2018-02-11T10:12:33Z'));
  expect(video.contentPartner).toEqual('cp1');
  expect(video.thumbnailUrl).toEqual('https://cdn.kaltura.com/thumbs/177.jpg');
  expect(video.playback instanceof YoutubePlayback).toBeTruthy();
  expect((video.playback as YoutubePlayback).getId()).toEqual('youtubeId');
  expect(video.badges).toEqual(['youtube']);
});
