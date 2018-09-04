import fetchMock from 'fetch-mock';
import fetchLinks from './fetchLinks';
import {Link} from './Link';
import {Links} from './Links';

test('it fetches links', async () => {
  fetchMock.get('/v1/', {_links: {search: {href: '/videos', templated: false}}});

  const links = await fetchLinks();

  const expectedLinks: Links = {
    videos: new Link({href: '/videos', templated: false}),
  };

  expect(links).toEqual(expectedLinks);
});
