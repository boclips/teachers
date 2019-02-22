import ApiStub from '../../../test-support/ApiStub';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';

test('displays video collection', async () => {
  new ApiStub().fetchCollections();

  const collectionPage = await CollectionPage.load();

  expect(collectionPage.getVideos()).toHaveLength(1);
  expect(collectionPage.getVideos()[0]).toMatchObject({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentPartner: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    badgeAlt: 'Ad free',
    subjects: ['Maths', 'Physics'],
  });
});
