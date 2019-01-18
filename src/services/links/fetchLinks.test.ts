import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';
import fetchLinks from './fetchLinks';

describe('when anonymous user', () => {
  test('creates mandatory links', async () => {
    MockFetchVerify.get('/v1/', {
      _links: {
        search: { href: '/videos', templated: false },
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        userDefaultCollection: { href: '/default-collection' },
      },
    });

    const links = await fetchLinks();

    const expectedLinks: Links = {
      videos: new Link({ href: '/videos', templated: false }),
      video: new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent: new Link({ href: '/events' }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      defaultCollection: new Link({ href: '/default-collection' }),
    };

    expect(links).toEqual(expectedLinks);
  });
});

describe('when active link available', () => {
  test('creates mandatory links plus activate link ', async () => {
    MockFetchVerify.get('/v1/', {
      _links: {
        search: { href: '/videos', templated: false },
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        activate: { href: '/users', templated: false },
        userDefaultCollection: { href: '/default-collection' },
      },
    });

    const links = await fetchLinks();

    const expectedLinks: Links = {
      videos: new Link({ href: '/videos', templated: false }),
      video: new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent: new Link({ href: '/events' }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      activate: new Link({ href: '/users', templated: false }),
      defaultCollection: new Link({ href: '/default-collection' }),
    };

    expect(links).toEqual(expectedLinks);
  });
});

describe('when profile link available', () => {
  test('creates mandatory links plus profile link ', async () => {
    MockFetchVerify.get('/v1/', {
      _links: {
        search: { href: '/videos', templated: false },
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        profile: { href: '/users/{id}', templated: true },
        userDefaultCollection: { href: '/default-collection' },
      },
    });

    const links = await fetchLinks();

    const expectedLinks: Links = {
      videos: new Link({ href: '/videos', templated: false }),
      video: new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent: new Link({ href: '/events' }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      profile: new Link({ href: '/users/{id}', templated: true }),
      defaultCollection: new Link({ href: '/default-collection' }),
    };

    expect(links).toEqual(expectedLinks);
  });
});
