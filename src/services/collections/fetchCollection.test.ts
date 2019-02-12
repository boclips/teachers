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
    defaultCollection: new Link({
      href: '/v1/users/me/collections/default',
    }),
  });

  collection = await fetchCollection(links);
});

test('returns default collection', () => {
  expect(collection.videos).toHaveLength(1);
  expect(collection.videos[0].id).toEqual('177');
});
