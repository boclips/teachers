import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';
import {
  userCollectionResponse,
  video177,
} from '../../../test-support/video-service-responses';

test('displays video collection', async () => {
  new ApiStub().fetchCollection({
    collectionId: 'default',
    collection: userCollectionResponse([video177]),
  });

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

test('allows removing videos from video collection', async () => {
  new ApiStub().fetchCollection({
    collectionId: 'default',
    collection: userCollectionResponse([video177]),
  });

  const collectionPage = await CollectionPage.load();

  expect(collectionPage.getVideos()).toHaveLength(1);

  const firstResult = collectionPage.getVideoCard(0);

  const toggleCollectionButton = firstResult
    .find(By.dataQa('remove-from-default-collection'))
    .first();

  toggleCollectionButton.simulate('click');

  expect(collectionPage.getVideos()).toHaveLength(0);
});
