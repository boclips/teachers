import { collectionResponse } from '../../../test-support/api-responses';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from '../../../test-support/factories';
import { bookmarkCollection } from './bookmarkCollection';

test('bookmark collection', async () => {
  MockFetchVerify.patch(
    '/v1/collections/the-id',
    undefined,
    200,
    collectionResponse(),
  );

  const patchedCollection = await bookmarkCollection(
    VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        bookmark: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
  );

  expect(patchedCollection).toBeTruthy();
});
