import { collectionResponse } from 'test-support/api-responses';
import MockFetchVerify from 'test-support/MockFetchVerify';
import { Link } from 'src/types/Link';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from 'test-support/factories';
import { unbookmarkCollection } from './unbookmarkCollection';

test('unbookmark collection', async () => {
  MockFetchVerify.patch(
    `/v1/collections/the-id`,
    undefined,
    200,
    collectionResponse(),
  );

  const patchedCollection = await unbookmarkCollection(
    VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        unbookmark: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
  );

  expect(patchedCollection).toBeTruthy();
});
