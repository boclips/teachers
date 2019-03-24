import ApiStub from '../../../test-support/ApiStub';
import { VideoDetailsPage } from '../../../test-support/page-objects/VideoDetailsPage';
import { video177 } from '../../../test-support/video-service-responses';

test('video details shows data', async () => {
  new ApiStub()
    .defaultUser()
    .fetchVideo({ video: video177 })
    .fetchCollections();

  const videoDetailsPage = await VideoDetailsPage.load();

  expect(videoDetailsPage.getVideoDetails()).toEqual({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentPartner: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    subjects: ['Maths', 'Physics'],
  });
});
