import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { VideoFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import validateShareCode from './validateShareCode';

let video;

beforeEach(() => {
  video = VideoFactory.sample({
    links: {
      validateShareCode: new Link({
        href: 'videos/5c542abf5438cdbcb56df0bf/match?shareCode={shareCode}',
        templated: true,
      }),
    } as any,
  });

  const axiosMock = new MockAdapter(axios);
  axiosMock
    .onGet(video.links.validateShareCode.getTemplatedLink({ shareCode: 'abc' }))
    .reply(200);
  axiosMock.onGet().reply(403);
});

test('returns true when the share code is correct', async () => {
  const validationResult = await validateShareCode(video, 'abc');
  expect(validationResult).toEqual(true);
});

test('returns false when the share code is incorrect', async () => {
  const validationResult = await validateShareCode(video, 'cba');
  expect(validationResult).toEqual(false);
});
