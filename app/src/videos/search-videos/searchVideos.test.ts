import { LinksFactory } from '../../../test-support/factories';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../links/Link';
import { SearchResults } from '../../State';
import { links, videos as videosResource } from '../../video-service-responses';
import searchVideos from './searchVideos';

test('search Videos', async () => {
  MockFetchVerify.get(
    '/v1/videos?query=hong kong',
    JSON.stringify(videosResource),
  );

  const results: SearchResults = await searchVideos(
    'hong kong',
    LinksFactory.sample({
      videos: new Link(links._links.search),
    }),
  );

  expect(results.query).toEqual('hong kong');
  expect(results.searchId).toEqual('srch-123');
  expect(results.videos).toHaveLength(2);
  expect(results.videos[0].title).toEqual(
    'KS3/4 Science: Demonstrating Chemistry',
  );
  expect(results.videos[1].title).toEqual('KS3/4 Science: Big Screen Science');
});
