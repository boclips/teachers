import ApiStub from '../../../test-support/ApiStub';
import { DiscoverCollectionListPage } from '../../../test-support/page-objects/DiscoverCollectionListPage';

test('displays maths collections', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    .fetchDiscoverMathsCollections()
    .fetchVideo();

  const collectionPage = await DiscoverCollectionListPage.loadMaths();

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
    updatedAt: 'Jan 16, 2019',
    createdBy: 'AI',
  });
});
