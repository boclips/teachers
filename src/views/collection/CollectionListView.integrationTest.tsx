import ApiStub from '../../../test-support/ApiStub';
import { CollectionListPage } from '../../../test-support/page-objects/CollectionListPage';

test('displays collections list', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    .fetchVideo();

  const collectionPage = await CollectionListPage.load();

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
    updatedAt: 'Jan 16, 2019',
  });
});

test('shows notification after deleting collections', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    .fetchVideo()
    .deleteCollection();

  const collectionsPage = await CollectionListPage.load();

  collectionsPage.deleteCollection(0);
  await collectionsPage.assertNotification(
    'Your collection "funky collection" has been deleted',
  );
});
