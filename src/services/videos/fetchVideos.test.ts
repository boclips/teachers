import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import queryString from 'query-string';
import { LinksFactory } from '../../../test-support/factories';
import { videos } from '../../../test-support/video-service-responses';
import { Constants } from '../../app/AppConstants';
import { Link } from '../../types/Link';
import fetchVideos from './fetchVideos';

let queryParams = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onGet().reply(200, JSON.stringify(videos), {});

  const links = LinksFactory.sample({
    videos: new Link({
      href:
        '/v1/videos?query={query}&size={size}&page={page}{&sort_by,include_tag,exclude_tag,duration_min,duration_max,age_range_min,age_range_max}',
      templated: true,
    }),
  });

  await fetchVideos(
    {
      query: 'foo',
      page: 1,
      filters: {
        includeTags: [Constants.CLASSROOM],
        excludeTags: [Constants.NEWS],
        duration_min: 100,
        duration_max: 200,
        age_range_min: 5,
        age_range_max: 11,
      },
      sortBy: 'RELEASE_DATE',
    },
    links,
  );

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
  expect(queryParams.include_tag).toEqual(Constants.CLASSROOM);
});

test('excludes news by default', () => {
  expect(queryParams.exclude_tag).toEqual(Constants.NEWS);
});

test('includes sort_by when provided', () => {
  expect(queryParams.sort_by).toEqual('RELEASE_DATE');
});

test('converts durations to ISO-8601', () => {
  expect(queryParams.duration_min).toEqual('PT1M40S');
  expect(queryParams.duration_max).toEqual('PT3M20S');
});

test('includes age range min and max when provided', () => {
  expect(queryParams.age_range_min).toEqual('5');
  expect(queryParams.age_range_max).toEqual('11');
});
