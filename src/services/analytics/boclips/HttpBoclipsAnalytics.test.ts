import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { VideoFactory } from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import HttpBoclipsAnalytics from './HttpBoclipsAnalytics';

test('logInteraction', async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onPost().reply(200);

  const video = VideoFactory.sample({
    id: 'id-1',
    links: {
      self: new Link({ href: `/v1/videos/id-1` }),
      logInteraction: new Link({
        href: '/v1/videos/id-1/events?logVideoInteraction=true&type={type}',
      }),
    },
  });

  await new HttpBoclipsAnalytics().logInteraction(
    video,
    'copied-to-google-classroom',
  );

  expect(axiosMock.history.post[0].url).toEqual(
    '/v1/videos/id-1/events?logVideoInteraction=true&type=copied-to-google-classroom',
  );
});

test('logInteraction rejects when link is missing', async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock.onPost().reply(200);

  const video = VideoFactory.sample({
    id: 'id-1',
    links: {
      self: new Link({ href: `/v1/videos/id-1` }),
    },
  });

  const result = new HttpBoclipsAnalytics().logInteraction(
    video,
    'copied-to-google-classroom',
  );

  await expect(result).rejects.toEqual('Video id-1 has no logInteraction link');
});
