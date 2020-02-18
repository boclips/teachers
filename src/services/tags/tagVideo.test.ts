import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { video177 } from 'test-support/api-responses';
import { TagFactory, VideoFactory } from 'test-support/factories';
import { Link } from 'src/types/Link';
import tagVideo from './tagVideo';

let body = null;

beforeEach(async () => {
  const axiosMock = new MockAdapter(axios);
  axiosMock
    .onPatch('https://api.example.com/v1/videos/177/tag')
    .reply(200, JSON.stringify(video177), {});

  await tagVideo(
    VideoFactory.sample({
      links: {
        self: new Link({ href: 'https://api.example.com/v1/videos/177' }),
        tag: new Link({ href: 'https://api.example.com/v1/videos/177/tag' }),
      },
    }),
    TagFactory.sample({
      links: { self: new Link({ href: 'https://api.example.com/tagurl/1' }) },
    }),
  );

  body = axiosMock.history.patch[0].data;
});

test('patches the correct tag', () => {
  expect(body).toEqual('https://api.example.com/tagurl/1');
});
