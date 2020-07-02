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

describe(`fetchCollection`, () => {
  it('returns available collections in skinny format', async () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock
      .onGet('/v1/collections/a-collection')
      .reply(200, JSON.stringify(collectionResponse([video177Slim])), {});

    const links = LinksFactory.sample({
      collection: new Link({
        href: '/v1/collections/{id}{?referer,shareCode}',
      }),
    });

    const collection = await fetchCollection(links, 'a-collection');

    expect(collection.id).toEqual('id');
  });

  it('returns available collections with subjects', async () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock
      .onGet('/v1/collections/a-collection')
      .reply(
        200,
        JSON.stringify(collectionResponseWithSubject([video177Slim])),
        {},
      );

    const links = LinksFactory.sample({
      collection: new Link({
        href: '/v1/collections/{id}{?referer,shareCode}',
      }),
    });

    const collection = await fetchCollection(links, 'a-collection');

    expect(collection.id).toEqual('id');
    expect(collection.subjects).toHaveLength(2);
    expect(collection.subjects[0]).toEqual('1');
    expect(collection.subjects[1]).toEqual('2');
  });

  it('returns a collection when a valid share code and referer is provided', async () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock
      .onGet('/v1/collections/a-collection?referer=123&shareCode=abc')
      .reply(
        200,
        JSON.stringify(
          collectionResponseWithSubject([video177Slim], 'a-collection'),
        ),
        {},
      );

    const links = LinksFactory.sample({
      collection: new Link({
        href: '/v1/collections/{id}{?referer,shareCode}',
      }),
    });

    const collection = await fetchCollection(
      links,
      'a-collection',
      '123',
      'abc',
    );

    expect(collection.id).toEqual('a-collection');
  });
});
