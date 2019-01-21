import { By } from '../../../test-support/By';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';
import { usersVideoCollection } from '../../../test-support/video-service-responses';

test('displays default collection', async () => {
  const collectionPage = await CollectionPage.load(usersVideoCollection);

  expect(collectionPage.getVideos()).toHaveLength(1);
  expect(collectionPage.getVideos()[0]).toMatchObject({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentPartner: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    badgeAlt: 'Ad free',
  });
});

test('allows removing videos from the default collection', async () => {
  const collectionPage = await CollectionPage.load(usersVideoCollection);

  expect(collectionPage.getVideos()).toHaveLength(1);

  const firstResult = collectionPage.getVideoCard(0);

  const toggleCollectionButton = firstResult
    .find(By.dataQa('default-collection-toggle'))
    .first();

  expect(toggleCollectionButton).toHaveText('Saved');

  toggleCollectionButton.simulate('click');

  expect(collectionPage.getVideos()).toHaveLength(0);
});
