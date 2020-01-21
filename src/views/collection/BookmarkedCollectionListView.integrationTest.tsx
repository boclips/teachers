import ApiStub from '../../../test-support/ApiStub';
import { BookmarkedCollectionListPage } from '../../../test-support/page-objects/BookmarkedCollectionListPage';

test('displays bookmarked collections list', async () => {
  new ApiStub()
    .defaultUser()
    .fetchBookmarkedCollections()
    .fetchVideo();

  const collectionPage = await BookmarkedCollectionListPage.load();

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
  });
});
