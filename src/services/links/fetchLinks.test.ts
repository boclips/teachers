import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';
import fetchLinks from './fetchLinks';

const prefix = 'https://api.example.com';

test('parses all links', async () => {
  MockFetchVerify.get(`${prefix}/v1/`, {
    _links: {
      searchVideos: { href: '/videos', templated: false },
      video: { href: '/videos/{id}', templated: true },
      createPlaybackEvent: { href: '/events' },
      createNoSearchResultsEvent: { href: '/events/no-search-results' },
      collection: { href: '/collection/{id}', templated: true },
      createCollection: { href: '/collections' },
      myCollections: { href: '/collections?owner=123' },
      publicCollections: { href: '/collections?list=yes&public=true' },
      bookmarkedCollections: { href: '/collections?bookmarked=true' },
      subjects: { href: '/subjects' },
      tags: { href: '/tags' },
      disciplines: { href: '/disciplines' },
    },
  });

  const links = await fetchLinks(prefix);

  const expectedLinks: Links = {
    videos: new Link({ href: '/videos', templated: false }),
    video: new Link({ href: '/videos/{id}', templated: true }),
    createPlaybackEvent: new Link({ href: '/events' }),
    createNoSearchResultsEvent: new Link({
      href: '/events/no-search-results',
    }),
    collection: new Link({ href: '/collection/{id}', templated: true }),
    myCollections: new Link({ href: '/collections?owner=123' }),
    createCollection: new Link({ href: '/collections' }),
    publicCollections: new Link({
      href: '/collections?list=yes&public=true',
    }),
    bookmarkedCollections: new Link({
      href: '/collections?bookmarked=true',
    }),
    subjects: new Link({
      href: '/subjects',
    }),
    tags: new Link({
      href: '/tags',
    }),
    disciplines: new Link({
      href: '/disciplines',
    }),
  };

  expect(links).toEqual(expectedLinks);
});

describe('when anonymous user', () => {
  test('creates mandatory links', async () => {
    MockFetchVerify.get(`${prefix}/v1/`, {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
      },
    });

    const links = await fetchLinks(prefix);

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
    MockFetchVerify.get(`${prefix}/v1/`, {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        activate: { href: '/users', templated: false },
      },
    });

    const links = await fetchLinks(prefix);

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
    MockFetchVerify.get(`${prefix}/v1/`, {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createPlaybackEvent: { href: '/events' },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        profile: { href: '/users/{id}', templated: true },
      },
    });

    const links = await fetchLinks(prefix);

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
