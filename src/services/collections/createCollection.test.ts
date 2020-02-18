import MockFetchVerify from 'test-support/MockFetchVerify';
import { Link } from 'src/types/Link';
import { Links } from 'src/types/Links';
import { LinksFactory, VideoFactory } from 'test-support/factories';
import { createCollection } from './createCollection';

let links: Links;
beforeEach(async () => {
  links = LinksFactory.sample({
    createCollection: new Link({
      href: '/v1/collections',
    }),
  });
});

test('create collection', async () => {
  MockFetchVerify.post(
    '/v1/collections',
    { title: 'avideo', videos: ['http://localhost/videos/78'] },
    201,
  );

  const success = await createCollection(links, {
    title: 'avideo',
    videos: [
      VideoFactory.sample({
        links: { self: new Link({ href: 'http://localhost/videos/78' }) },
      }),
    ],
  });

  expect(success).toEqual(true);
});
