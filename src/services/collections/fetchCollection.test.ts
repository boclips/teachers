import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  collectionResponse,
  collectionResponseWithSubject,
  video177Slim,
} from '../../../test-support/api-responses';
import { LinksFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { fetchCollection } from './fetchCollection';

test('returns available collections in skinny format', async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock
    .onGet()
    .reply(200, JSON.stringify(collectionResponse([video177Slim])), {});

  const links = LinksFactory.sample({
    collection: new Link({
      href: '/v1/collections/a-collection',
    }),
  });

  const collection = await fetchCollection(links, 'a-collection');

  expect(collection.id).toEqual('id');
});

test('returns available collections with subjects', async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock
    .onGet()
    .reply(
      200,
      JSON.stringify(collectionResponseWithSubject([video177Slim])),
      {},
    );

  const links = LinksFactory.sample({
    collection: new Link({
      href: '/v1/collections/a-collection',
    }),
  });

  const collection = await fetchCollection(links, 'a-collection');

  expect(collection.id).toEqual('id');
  expect(collection.subjects).toHaveLength(2);
  expect(collection.subjects[0]).toEqual('1');
  expect(collection.subjects[1]).toEqual('2');
});
