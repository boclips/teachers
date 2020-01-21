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
  });
});
