import MockFetchVerify from '../../test-support/MockFetchVerify';
import fetchLinks from './fetchLinks';
import { Link } from './Link';
import { Links } from './Links';

test('it fetches links', async () => {
  MockFetchVerify.get('/v1/', {
    _links: {
      search: { href: '/videos', templated: false },
      video: { href: '/videos/{id}', templated: true },
      createEvent: { href: '/events' },
      createNoSearchResultsEvent: { href: '/events/no-search-results' },
    },
  });

  const links = await fetchLinks();

  const expectedLinks: Links = {
    videos: new Link({ href: '/videos', templated: false }),
    video: new Link({ href: '/videos/{id}', templated: true }),
    createEvent: new Link({ href: '/events' }),
    createNoSearchResultsEvent: new Link({ href: '/events/no-search-results' }),
  };

  expect(links).toEqual(expectedLinks);
});
