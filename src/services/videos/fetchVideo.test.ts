import { LinksFactory } from '../../../test-support/factories';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { video177 } from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import fetchVideo, { fetchVideoFromSelfLink } from './fetchVideo';

test('resolves with a video object when successfuly fetched', async () => {
  MockFetchVerify.get('/v1/videos/177', JSON.stringify(video177));

  const links = LinksFactory.sample({
    video: new Link({ href: '/v1/videos/{id}', templated: true }),
  });

  const video = await fetchVideo('177', links);

  expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
});

test('resolves with a video object when successfuly fetched', async () => {
  MockFetchVerify.get('/v1/videos/177', JSON.stringify(video177));

  const videoSelfLink = new Link({
    href: '/v1/videos/177',
    templated: false,
  });
  const video = await fetchVideoFromSelfLink(videoSelfLink);

  expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
});
