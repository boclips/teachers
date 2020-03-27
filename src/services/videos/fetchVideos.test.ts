import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import queryString from 'query-string';
import { DurationRange } from 'src/types/DurationRange';
import { videosSearchResponse } from '../../../test-support/api-responses';
import { LinksFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { VideoType } from '../../types/Video';
import fetchVideos from './fetchVideos';

let queryParams = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onGet().reply(200, JSON.stringify(videosSearchResponse), {});

  const links = LinksFactory.sample({
    videos: new Link({
      href:
        '/v1/videos?query={query}&size={size}&page={page}{&sort_by,include_tag,exclude_tag,duration,duration_min,duration_max,age_range_min,age_range_max,age_range,subject,type,is_classroom}',
      templated: true,
    }),
  });

  await fetchVideos(
    {
      query: 'foo',
      page: 1,
      filters: {
        isClassroom: true,
        duration: [new DurationRange({ min: 100, max: 200 })],
        age_range_min: 5,
        age_range_max: 11,
        type: [VideoType.STOCK, VideoType.INSTRUCTIONAL],
        subject: ['subject-one-id', 'subject-two-id'],
      },
      sortBy: 'RELEASE_DATE',
    },
    links,
  );

  const url = axiosMock.history.get[0].url;
  queryParams = queryString.parse(url.split('?')[1], { arrayFormat: 'comma' });
});

test('requests the correct search query', () => {
  expect(queryParams.query).toEqual('foo');
});

test('includes video type in a search request', () => {
  expect(queryParams.type).toEqual(
    expect.arrayContaining([VideoType.STOCK, VideoType.INSTRUCTIONAL]),
  );
});

test('includes page and size params in the request', () => {
  expect(queryParams.page).toEqual('0');
  expect(queryParams.size).not.toHaveLength(0);
});

test('only requests content for the classroom', () => {
  expect(queryParams.is_classroom).toEqual('true');
});

test('includes sort_by when provided', () => {
  expect(queryParams.sort_by).toEqual('RELEASE_DATE');
});

test('converts durations to ranges of ISO-8601', () => {
  expect(queryParams.duration).toEqual('PT1M40S-PT3M20S');
});

test('includes age range min and max when provided', () => {
  expect(queryParams.age_range_min).toEqual('5');
  expect(queryParams.age_range_max).toEqual('11');
});
test('includes a subject when provided', () => {
  expect(queryParams.subject).toEqual(['subject-one-id', 'subject-two-id']);
});
