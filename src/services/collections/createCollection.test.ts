import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';
import { LinksFactory, VideoFactory } from './../../../test-support/factories';
import { createCollection } from './createCollection';

let links: Links;
beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onPost().reply(201, {});

  links = LinksFactory.sample({
    collections: new Link({
      href: '/v1/collections',
    }),
  });
});

test('create collection', async () => {
  MockFetchVerify.post(
    '/v1/collections',
    '{"title": "avideo", "videos":["http://localhost/videos/78"]}',
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
