import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from './../../../test-support/factories';
import { deleteCollection } from './deleteCollection';

test('delete collection', async () => {
  MockFetchVerify.delete('/v1/collections/the-id', { title: 'avideo' }, 204);

  const success = await deleteCollection(
    VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        remove: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
  );

  expect(success).toEqual(true);
});
