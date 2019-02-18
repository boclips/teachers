import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LinksFactory } from '../../../test-support/factories';
import { userCollectionsResponse } from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import { fetchCollections } from './fetchCollections';

let collections = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onGet().reply(200, JSON.stringify(userCollectionsResponse()), {});

  const links = LinksFactory.sample({
    collections: new Link({
      href: '/v1/collections',
    }),
  });

  collections = await fetchCollections(links);
});

test('returns available collections', () => {
  expect(collections[0].id).toEqual('id');
  expect(collections[0].title).toEqual('funky collection');
  expect(collections[0].videos).toHaveLength(1);
  expect(collections[0].videos[0].id).toEqual('177');
});
