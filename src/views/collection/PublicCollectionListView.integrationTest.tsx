import ApiStub from '../../../test-support/ApiStub';
import { PublicCollectionListPage } from '../../../test-support/page-objects/PublicCollectionListPage';

test('displays public collections list', async () => {
  new ApiStub()
    .defaultUser()
    .fetchPublicCollections()
    .fetchVideo();

  const collectionPage = await PublicCollectionListPage.load();

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
    updatedAt: 'Jan 16, 2019',
    createdBy: 'AI',
  });
});
