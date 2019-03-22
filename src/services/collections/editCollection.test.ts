import { VideoCollectionFactory } from '../../../test-support/factories';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import { VideoCollectionLinksFactory } from './../../../test-support/factories';
import { editCollection } from './editCollection';

test('edit collection', async () => {
  MockFetchVerify.patch(
    '/v1/collections/the-id',
    { title: 'avideo', isPublic: false },
    204,
  );

  const success = await editCollection({
    originalCollection: VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
    title: 'avideo',
    isPublic: false,
  });

  expect(success).toEqual(true);
});