import { VideoCollectionFactory } from '../../../test-support/factories';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { AgeRange } from '../../types/AgeRange';
import { Link } from '../../types/Link';
import { VideoCollectionLinksFactory } from './../../../test-support/factories';
import { editCollection } from './editCollection';

test('edit collection', async () => {
  MockFetchVerify.patch(
    '/v1/collections/the-id',
    { title: 'avideo', isPublic: false, ageRange: { min: null, max: null } },
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
    ageRange: new AgeRange(),
  });

  expect(success).toEqual(true);
});

test('change subjects on collection', async () => {
  MockFetchVerify.patch(
    '/v1/collections/the-id',
    {
      title: 'avideo',
      subjects: ['id-one', 'id-two'],
      ageRange: { min: null, max: null },
    },
    204,
  );

  const success = await editCollection({
    originalCollection: VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
    title: 'avideo',
    subjects: ['id-one', 'id-two'],
    ageRange: new AgeRange(),
  });

  expect(success).toEqual(true);
});

test('change age range on collection', async () => {
  MockFetchVerify.patch(
    '/v1/collections/the-id',
    { title: 'avideo', ageRange: { min: 7, max: 11 } },
    204,
  );

  const success = await editCollection({
    originalCollection: VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
    title: 'avideo',
    ageRange: new AgeRange(7, 11),
  });

  expect(success).toEqual(true);
});

test('change description of collection', async () => {
  MockFetchVerify.patch(
    '/v1/collections/the-id',
    {
      title: 'avideo',
      description: 'new description',
      ageRange: { min: null, max: null },
    },
    204,
  );

  const success = await editCollection({
    originalCollection: VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/v1/collections/the-id' }),
      }),
    }),
    title: 'avideo',
    description: 'new description',
    ageRange: new AgeRange(),
  });

  expect(success).toEqual(true);
});
