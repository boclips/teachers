import fetchMock from 'fetch-mock';
import {Link} from '../links/Link';
import searchVideos from './searchVideos';
import {links, videos} from './video-service-responses';

test('search Videos', async () => {
  fetchMock.get('/v1/videos?query=hong kong', JSON.stringify(videos));

  const result = await searchVideos('hong kong', {videos: new Link(links._links.search)});

  expect(result).toEqual([
    {title: 'KS3/4 Science: Demonstrating Chemistry'},
    {title: 'KS3/4 Science: Big Screen Science'},
  ]);
});
