import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import queryString from 'query-string';
import { video177 } from '../../../test-support/api-responses';
import { VideoFactory } from '../../../test-support/factories';
import rateVideo from './rateVideo';

let queryParams = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onPatch().reply(200, JSON.stringify(video177), {});

  await rateVideo(VideoFactory.sample(), 3);

  const url = axiosMock.history.patch[0].url;
  queryParams = queryString.parse(url.split('?')[1]);
});

test('patches the correct rating', () => {
  expect(queryParams.rating).toEqual('3');
});
