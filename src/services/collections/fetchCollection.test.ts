import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LinksFactory } from '../../../test-support/factories';
import {
  collectionResponse,
  video177Slim,
} from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import { fetchCollection } from './fetchCollection';

let collection = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock
    .onGet()
    .reply(200, JSON.stringify(collectionResponse([video177Slim])), {});

  const links = LinksFactory.sample({
    collection: new Link({
      href: '/v1/collections/a-collection',
    }),
  });

  collection = await fetchCollection(links, 'a-collection');
});

test('returns available collections in skinny format', () => {
  expect(collection.id).toEqual('id');
});
