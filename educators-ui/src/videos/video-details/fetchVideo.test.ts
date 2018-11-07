import { LinksFactory } from '../../../test-support/factories';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../links/Link';
import { video177 } from '../../video-service-responses';
import fetchVideo from './fetchVideo';

test('resolves with a video object when successfuly fetched', async () => {
  MockFetchVerify.get('/v1/videos/177', JSON.stringify(video177));

  const links = LinksFactory.sample({
    video: new Link({ href: '/v1/videos/{id}', templated: true }),
  });

  const video = await fetchVideo('177', links);

  expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
});
