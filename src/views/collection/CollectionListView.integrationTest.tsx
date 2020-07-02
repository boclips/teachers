import { video177 } from 'test-support/api-responses';
import { fakeVideoSetup } from 'test-support/fakeApiClientSetup';
import ApiStub from '../../../test-support/ApiStub';
import MyCollectionListPage from '../../../test-support/page-objects/MyCollectionListPage';

test('displays collections list', async () => {
  new ApiStub().defaultUser().fetchCollections();

  await fakeVideoSetup(video177);

  const collectionPage = await MyCollectionListPage.load();

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
  });
});
