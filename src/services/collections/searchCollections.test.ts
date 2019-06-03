import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import queryString from 'query-string';
import { LinksFactory } from '../../../test-support/factories';
import { collectionsResponse } from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import searchCollections from './searchCollections';

let queryParams = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onGet().reply(200, JSON.stringify(collectionsResponse), {});

  const links = LinksFactory.sample({
    searchCollections: new Link({
      href: '/v1/collections?query={query}',
      templated: true,
    }),
  });

  await searchCollections(
    {
      query: 'foo',
    },
    links,
  );

  const url = axiosMock.history.get[0].url;
  queryParams = queryString.parse(url.split('?')[1]);
});

test('requests the correct search query', () => {
  expect(queryParams.query).toEqual('foo');
});
