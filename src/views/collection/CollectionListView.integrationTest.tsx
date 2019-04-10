import ApiStub from '../../../test-support/ApiStub';
import { MyCollectionListPage } from '../../../test-support/page-objects/MyCollectionListPage';

test('displays collections list', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    .fetchVideo();

  const collectionPage = await MyCollectionListPage.load();

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
    updatedAt: 'Jan 16, 2019',
    createdBy: 'AI',
  });
});

test('shows notification after deleting collections', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    .fetchVideo()
    .deleteCollection();

  const collectionsPage = await MyCollectionListPage.load();

  collectionsPage.deleteCollection(0);
  await collectionsPage.assertNotification(
    'Your collection "funky collection" has been deleted',
  );
});
