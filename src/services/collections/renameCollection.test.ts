import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from './../../../test-support/factories';
import { renameCollection } from './renameCollection';

test('rename collection', async () => {
  MockFetchVerify.patch('/v1/collections/the-id', { title: 'avideo' }, 204);

  const success = await renameCollection({
    title: 'avideo',
    originalCollection: VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
  });

  expect(success).toEqual(true);
});
