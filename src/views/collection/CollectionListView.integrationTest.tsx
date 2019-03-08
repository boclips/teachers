import ApiStub from '../../../test-support/ApiStub';
import eventually from '../../../test-support/eventually';
import { CollectionListPage } from '../../../test-support/page-objects/CollectionListPage';
import {
  userCollectionsResponse,
  video177,
  video177Slim,
} from '../../../test-support/video-service-responses';

test('displays collections list', async () => {
  new ApiStub()
    .fetchCollections(userCollectionsResponse([video177Slim]))
    .fetchVideo({ video: video177 });

  const collectionPage = await CollectionListPage.load();

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 0,
    updatedAt: 'Jan 16, 2019',
  });

  eventually(() => {
    expect(collectionPage.getCollections()[0]).toMatchObject({
      title: 'funky collection',
      numberOfVideos: 1,
      updatedAt: 'Jan 16, 2019',
    });
  });
});

test('shows notification after deleting collections', async () => {
  new ApiStub()
    .fetchCollections(userCollectionsResponse())
    .fetchVideo({ video: video177 })
    .deleteCollection('/v1/collections/default');

  const collectionsPage = await CollectionListPage.load();

  collectionsPage.deleteCollection(0);
  await collectionsPage.assertNotification(
    'Your collection "funky collection" has been deleted',
  );
});
