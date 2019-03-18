import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';
import fetchLinks from './fetchLinks';

test('parses all links', async () => {
  MockFetchVerify.get('/v1/', {
    _links: {
      search: { href: '/videos', templated: false },
      video: { href: '/videos/{id}', templated: true },
      createPlaybackEvent: { href: '/events' },
      createNoSearchResultsEvent: { href: '/events/no-search-results' },
      userCollection: { href: '/default-collection', templated: true },
      userCollections: { href: '/collections' },
      userCollectionsList: { href: '/collections?list' },
      publicCollections: { href: '/collections?list=yes&public=true' },
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
    collection: new Link({ href: '/default-collection', templated: true }),
    collections: new Link({ href: '/collections' }),
    userCollectionsList: new Link({ href: '/collections?list' }),
    publicCollections: new Link({
      href: '/collections?list=yes&public=true',
    }),
  };

  expect(links).toEqual(expectedLinks);
});

describe('when anonymous user', () => {
  test('creates mandatory links', async () => {
    MockFetchVerify.get('/v1/', {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
      },
    });

    const links = await fetchLinks();

    const expectedLinks: Links = {
      video: new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent: new Link({ href: '/events' }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
    };

    expect(links).toEqual(expectedLinks);
  });
});

describe('when activate link available', () => {
  test('creates mandatory links plus activate link ', async () => {
    MockFetchVerify.get('/v1/', {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        activate: { href: '/users', templated: false },
      },
    });

    const links = await fetchLinks();

    const expectedLinks: Links = {
      video: new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent: new Link({ href: '/events' }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      activate: new Link({ href: '/users', templated: false }),
    };

    expect(links).toEqual(expectedLinks);
  });
});

describe('when profile link available', () => {
  test('creates mandatory links plus profile link ', async () => {
    MockFetchVerify.get('/v1/', {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        profile: { href: '/users/{id}', templated: true },
      },
    });

    const links = await fetchLinks();

    const expectedLinks: Links = {
      video: new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent: new Link({ href: '/events' }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      profile: new Link({ href: '/users/{id}', templated: true }),
    };

    expect(links).toEqual(expectedLinks);
  });
});
