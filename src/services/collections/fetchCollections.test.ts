import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AgeRange } from '@bit/boclips._ui.badge';
import {
  collectionResponseWithSubject,
  collectionsResponse,
} from '../../../test-support/api-responses';
import {
  LinksFactory,
  PageableCollectionsFactory,
} from '../../../test-support/factories';
import { Link } from '../../types/Link';
import {
  fetchNextCollectionsPage,
  fetchPageableCollections,
} from './fetchCollections';

const links = LinksFactory.sample({
  myCollections: new Link({
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
        JSON.stringify(collectionsResponse([collectionResponseWithSubject()])),
        {},
      );

    const collections = await fetchPageableCollections(links, {
      key: 'myCollections',
    });

    expect(collections.items[0].id).toEqual('id');
    expect(collections.items[0].title).toEqual('funky collection');
    expect(collections.items[0].updatedAt).toEqual('2019-01-16T12:00:00.870Z');
    expect(collections.items[0].videoIds).toHaveLength(1);
    expect(collections.items[0].videoIds[0].value).toEqual('177');
    expect(collections.items[0].isPublic).toEqual(true);
    expect(collections.items[0].createdBy).toEqual('AI');
    expect(collections.items[0].ageRange).toEqual(new AgeRange(3, 9));
    expect(collections.items[0].subjects).toContain('1');
  });
});

describe('public collections', () => {
  test('returns available collections in skinny format for user collections list', async () => {
    new MockAdapter(axios)
      .onGet('/v1/collections?public')
      .replyOnce(200, JSON.stringify(collectionsResponse()), {});
    const collections = await fetchPageableCollections(links, {
      key: 'publicCollections',
    });

    expect(collections.items[0].id).toEqual('id');
    expect(collections.items[0].title).toEqual('funky collection');
    expect(collections.items[0].updatedAt).toEqual('2019-01-16T12:00:00.870Z');
    expect(collections.items[0].videoIds).toHaveLength(1);
    expect(collections.items[0].videoIds[0].value).toEqual('177');
    expect(collections.items[0].isPublic).toEqual(true);
    expect(collections.items[0].createdBy).toEqual('AI');
    expect(collections.items[0].ageRange).toEqual(new AgeRange(3, 9));

    expect(collections.links.next.getOriginalLink()).toEqual(
      'http://localhost/v1/collections/next',
    );
  });

  test('returns next collections page', async () => {
    new MockAdapter(axios)
      .onGet('/v1/collections?publicpage')
      .replyOnce(200, JSON.stringify(collectionsResponse()), {});

    const collections = await fetchNextCollectionsPage(
      PageableCollectionsFactory.sample({
        links: { next: new Link({ href: '/v1/collections?publicpage' }) },
      }),
    );

    expect(collections.items[0].id).toEqual('id');
    expect(collections.items[0].title).toEqual('funky collection');
    expect(collections.items[0].updatedAt).toEqual('2019-01-16T12:00:00.870Z');
    expect(collections.items[0].videoIds).toHaveLength(1);
    expect(collections.items[0].videoIds[0].value).toEqual('177');
    expect(collections.items[0].isPublic).toEqual(true);
    expect(collections.items[0].ageRange).toEqual(new AgeRange(3, 9));
  });
});
