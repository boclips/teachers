import { VideoDetailsPage } from '../../../test-support/page-objects/VideoDetailsPage';

test('video details shows data', async () => {
  const videoDetailsPage = await VideoDetailsPage.load();

  expect(videoDetailsPage.getVideoDetails()).toEqual({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentProvider: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
  });
});
