import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LinksFactory } from '../../../test-support/factories';
import {
  userCollectionsResponse,
  video177Slim,
} from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import {
  fetchPublicCollections,
  fetchUserCollections,
} from './fetchCollections';

const links = LinksFactory.sample({
  userCollectionsList: new Link({
    href: '/v1/collections?projection=list',
  }),
  publicCollections: new Link({
    href: '/v1/collections?public',
  }),
});

describe('user collections', () => {
  test('returns available collections in skinny format for user collections list', async () => {
    new MockAdapter(axios)
      .onGet('/v1/collections?projection=list')
      .replyOnce(
        200,
        JSON.stringify(userCollectionsResponse([video177Slim])),
        {},
      );

    const collections = await fetchUserCollections(links);

    expect(collections[0].id).toEqual('id');
    expect(collections[0].title).toEqual('funky collection');
    expect(collections[0].updatedAt).toEqual('2019-01-16T12:00:00.870Z');
    expect(collections[0].videoIds).toHaveLength(1);
    expect(collections[0].videoIds[0].id).toEqual('177');
    expect(collections[0].videos).toEqual({});
    expect(collections[0].isPublic).toEqual(true);
  });
});

describe('public collections', () => {
  test('returns available collections in skinny format for user collections list', async () => {
    new MockAdapter(axios)
      .onGet('/v1/collections?public')
      .replyOnce(
        200,
        JSON.stringify(userCollectionsResponse([video177Slim])),
        {},
      );
    const collections = await fetchPublicCollections(links);

    expect(collections[0].id).toEqual('id');
    expect(collections[0].title).toEqual('funky collection');
    expect(collections[0].updatedAt).toEqual('2019-01-16T12:00:00.870Z');
    expect(collections[0].videoIds).toHaveLength(1);
    expect(collections[0].videoIds[0].id).toEqual('177');
    expect(collections[0].videos).toEqual({});
    expect(collections[0].isPublic).toEqual(true);
  });
});
