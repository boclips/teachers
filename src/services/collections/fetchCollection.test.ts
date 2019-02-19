import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LinksFactory } from '../../../test-support/factories';
import {
  userCollectionResponse,
  video177,
} from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import { fetchCollection } from './fetchCollection';

let collection = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock
    .onGet()
    .reply(200, JSON.stringify(userCollectionResponse([video177])), {});

  const links = LinksFactory.sample({
    collection: new Link({
      href: '/v1/users/me/collections/{id}',
    }),
  });

  collection = await fetchCollection(links, 'default');
});

test('returns a concrete collection', () => {
  expect(collection.videos).toHaveLength(1);
  expect(collection.videos[0].id).toEqual('177');
});
