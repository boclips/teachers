import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import queryString from 'query-string';
import { collectionsResponse } from '../../../test-support/api-responses';
import { LinksFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import searchCollections from './searchCollections';

describe('searchCollections', () => {
  let axiosMock;
  let queryParams = null;
  let links;
  beforeEach(async () => {
    axiosMock = new MockAdapter(axios);
    axiosMock.onGet().reply(200, JSON.stringify(collectionsResponse), {});

    links = LinksFactory.sample({
      searchPublicCollections: new Link({
        href:
          '/v1/collections?public=true{&query,subject,projection,page,size}',
        templated: true,
      }),
    });
  });

  test('requests the correct search query', async () => {
    await searchCollections(
      {
        query: 'foo',
      },
      links,
    );

    const url = axiosMock.history.get[0].url;
    queryParams = queryString.parse(url.split('?')[1]);

    expect(queryParams.query).toEqual('foo');
    expect(queryParams.size).toEqual('5');
  });

  test('searches with a subject filter', async () => {
    await searchCollections(
      {
        query: 'foo',
        filters: {
          subject: ['my-subject-id-1', 'my-subject-id-2'],
        },
      },
      links,
    );

    const url = axiosMock.history.get[0].url;
    queryParams = queryString.parse(url.split('?')[1]);

    expect(queryParams.subject).toEqual('my-subject-id-1,my-subject-id-2');
  });
});
