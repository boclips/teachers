import moment = require('moment');
import { video177 } from '../video-service-responses';
import convertVideoResource from './convertVideoResource';
import { StreamPlayback } from './Video';

test('converts a video', () => {
  const video = convertVideoResource(video177);

  expect(video.id).toEqual('177');
  expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
  expect(video.description).toEqual('Matthew Tosh shows us the science.');
  expect(video.duration).toEqual(moment.duration({ minutes: 1, seconds: 2 }));
  expect(video.releasedOn).toEqual(new Date(Date.UTC(2018, 1, 11)));
  expect(video.contentProvider).toEqual('cp1');
  expect(video.thumbnailUrl).toEqual('https://cdn.kaltura.com/thumbs/177.jpg');

  expect(video.playback instanceof StreamPlayback).toBeTruthy();
  expect((video.playback as StreamPlayback).getUrl()).toEqual(
    'https://cdn.kaltura.com/stream/147.mpd',
  );
});
