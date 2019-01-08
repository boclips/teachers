import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import queryString from 'query-string';
import { LinksFactory } from '../../../test-support/factories';
import { videos } from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import fetchVideos from './fetchVideos';

let queryParams = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onGet().reply(200, JSON.stringify(videos), {});

  const links = LinksFactory.sample({
    videos: new Link({
      href: '/v1/videos?query={query}&size={size}&page={page}{&use_case}',
      templated: true,
    }),
  });

  await fetchVideos({ query: 'foo', page: 1 }, links);

  const url = axiosMock.history.get[0].url;
  queryParams = queryString.parse(url.split('?')[1]);
});

test('requests the correct search query', () => {
  expect(queryParams.query).toEqual('foo');
});

test('includes page and size params in the request', () => {
  expect(queryParams.page).toEqual('0');
  expect(queryParams.size).not.toHaveLength(0);
});

test('only requests content for the classroom', () => {
  expect(queryParams.use_case).toEqual('classroom');
});
