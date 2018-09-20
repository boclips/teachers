import { LinksFactory } from '../../../test-support/factories';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../links/Link';
import { links, videos as videosResource } from '../../video-service-responses';
import searchVideos from './searchVideos';

test('search Videos', async () => {
  MockFetchVerify.get(
    '/v1/videos?query=hong kong',
    JSON.stringify(videosResource),
  );

  const videos = await searchVideos(
    'hong kong',
    LinksFactory.sample({
      videos: new Link(links._links.search),
    }),
  );

  expect(videos).toHaveLength(2);
  expect(videos[0].title).toEqual('KS3/4 Science: Demonstrating Chemistry');
  expect(videos[1].title).toEqual('KS3/4 Science: Big Screen Science');
});
