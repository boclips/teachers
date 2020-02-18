import * as moment from 'moment';
import {
  video177,
  videoWithoutTemplatedThumbnail,
  videoWithTemplatedThumbnail,
  youtubeVideo1,
} from 'test-support/api-responses';
import { SubjectFactory } from 'test-support/factories';
import { StreamPlayback, YoutubePlayback } from 'src/types/Video';
import convertVideoResource from './convertVideoResource';

test('converts a video with stream playback', () => {
  const video = convertVideoResource(video177);
  const mathsSubject = SubjectFactory.sample({
    id: 'maths-subject-id',
    name: 'Maths',
  });
  const physicsSubject = SubjectFactory.sample({
    id: 'physics-subject-id',
    name: 'Physics',
  });

  expect(video.id).toEqual('177');
  expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
  expect(video.description).toEqual('Matthew Tosh shows us the science.');
  expect(video.duration).toEqual(moment.duration({ minutes: 1, seconds: 2 }));
  expect(video.releasedOn).toEqual(new Date('2018-02-11T10:12:33Z'));
  expect(video.rating).toEqual(3);
  expect(video.yourRating).toEqual(5);
  expect(video.createdBy).toEqual('cp1');
  expect(video.subjects).toEqual([mathsSubject, physicsSubject]);
  expect(video.playback instanceof StreamPlayback).toBeTruthy();
  expect((video.playback as StreamPlayback).getUrl()).toEqual(
    'https://cdn.kaltura.com/stream/147.mpd',
  );
  expect(video.badges).toEqual(['ad-free']);
  expect(video.bestFor).toEqual('Hook');
  expect(video.links.rate.getOriginalLink()).toBeTruthy();
  expect(video.links.tag.getOriginalLink()).toBeTruthy();
  expect(video.links.logInteraction.getOriginalLink()).toBeTruthy();
  expect(video.promoted).toEqual(true);
});

test('converts a video with templated thumbnail', () => {
  const video = convertVideoResource(videoWithTemplatedThumbnail);

  expect(video.thumbnailUrl).toEqual(
    'https://cdnapisec.kaltura.com/p/1776261/thumbnail/entry_id/0_yk29dggt/width/500/vid_slices/3/vid_slice/1',
  );
});

test('converts a video without templated thumbnail', () => {
  const video = convertVideoResource(videoWithoutTemplatedThumbnail);

  expect(video.thumbnailUrl).toEqual(
    'https://cdnapisec.kaltura.com/p/1776261/thumbnail/entry_id/0_yk29dggt/width/1200/vid_slices/3/vid_slice/1',
  );
});

test('converts a video with youtube playback', () => {
  const video = convertVideoResource(youtubeVideo1);
  expect(video.id).toEqual('1');
  expect(video.title).toEqual('A youtube video');
  expect(video.description).toEqual('Matthew Tosh shows us the science.');
  expect(video.duration).toEqual(moment.duration({ minutes: 1, seconds: 2 }));
  expect(video.releasedOn).toEqual(new Date('2018-02-11T10:12:33Z'));
  expect(video.createdBy).toEqual('cp1');
  expect(video.thumbnailUrl).toEqual('https://cdn.kaltura.com/thumbs/177.jpg');
  expect(video.playback instanceof YoutubePlayback).toBeTruthy();
  expect((video.playback as YoutubePlayback).getId()).toEqual('youtubeId');
  expect(video.badges).toEqual(['youtube']);
});
