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
      createNoSearchResultsEvent: { href: '/events/no-search-results' },
      collection: { href: '/collection/{id}', templated: true },
      createCollection: { href: '/collections' },
      myCollections: { href: '/collections?owner=123' },
      discoverCollections: { href: '/collections?list=yes&discoverable=true' },
      promotedCollections: {
        href: '/collections?discoverable=true&promoted=true',
      },
      subjects: { href: '/subjects' },
      countries: { href: '/countries' },
      tags: { href: '/tags' },
      disciplines: { href: '/disciplines' },
      mySavedCollections: {
        href:
          '/collections?projection=list&page=0&size=30&owner=123&bookmarked=true&sort_by=TITLE',
      },
    },
  });

  const links = await fetchLinks(prefix);

  const expectedLinks: Links = {
    videos: new Link({ href: '/videos', templated: false }),
    video: new Link({ href: '/videos/{id}', templated: true }),
    createNoSearchResultsEvent: new Link({
      href: '/events/no-search-results',
    }),
    collection: new Link({ href: '/collection/{id}', templated: true }),
    myCollections: new Link({ href: '/collections?owner=123' }),
    createCollection: new Link({ href: '/collections' }),
    discoverCollections: new Link({
      href: '/collections?list=yes&discoverable=true',
    }),
    promotedCollections: new Link({
      href: '/collections?discoverable=true&promoted=true',
    }),
    subjects: new Link({
      href: '/subjects',
    }),
    countries: new Link({
      href: '/countries',
    }),
    tags: new Link({
      href: '/tags',
    }),
    disciplines: new Link({
      href: '/disciplines',
    }),
    myResources: new Link({
      href:
        '/collections?projection=list&page=0&size=30&owner=123&bookmarked=true&sort_by=TITLE',
    }),
  };

  expect(links).toEqual(expectedLinks);
});

describe('when anonymous user', () => {
  test('creates mandatory links', async () => {
    MockFetchVerify.get(`${prefix}/v1/`, {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        validateShareCode: {
          href: '/{id}/shareCode/{shareCode}',
          templated: true,
        },
      },
    });

    const links = await fetchLinks(prefix);

    const expectedLinks: Links = {
      video: new Link({ href: '/videos/{id}', templated: true }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      validateShareCode: new Link({
        href: '/{id}/shareCode/{shareCode}',
        templated: true,
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
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        activate: { href: '/users', templated: false },
      },
    });

    const links = await fetchLinks(prefix);

    const expectedLinks: Links = {
      video: new Link({ href: '/videos/{id}', templated: true }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      activate: new Link({ href: '/users', templated: false }),
    };

    expect(links).toEqual(expectedLinks);
  });
});

describe('when reportAccessExpired link available', () => {
  test('creates mandatory links plus reportAccessExpired link ', async () => {
    MockFetchVerify.get(`${prefix}/v1/`, {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        reportAccessExpired: { href: '/renew-access', templated: false },
      },
    });

    const links = await fetchLinks(prefix);

    const expectedLinks: Links = {
      video: new Link({ href: '/videos/{id}', templated: true }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      reportAccessExpired: new Link({
        href: '/renew-access',
        templated: false,
      }),
    };

    expect(links).toEqual(expectedLinks);
  });
});

describe('when profile link available', () => {
  test('creates mandatory links plus profile link ', async () => {
    MockFetchVerify.get(`${prefix}/v1/`, {
      _links: {
        video: { href: '/videos/{id}', templated: true },
        createNoSearchResultsEvent: { href: '/events/no-search-results' },
        profile: { href: '/users/{id}', templated: true },
      },
    });

    const links = await fetchLinks(prefix);

    const expectedLinks: Links = {
      video: new Link({ href: '/videos/{id}', templated: true }),
      createNoSearchResultsEvent: new Link({
        href: '/events/no-search-results',
      }),
      profile: new Link({ href: '/users/{id}', templated: true }),
    };

    expect(links).toEqual(expectedLinks);
  });
});
