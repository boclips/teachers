import * as fetch from 'fetch-mock';
import {Link} from '../links/Link';
import {links, videos} from './video-service-responses';
import searchVideos from './searchVideos';


test('search Videos', async () => {
  fetch.mockResponseOnce(JSON.stringify(videos), {url: '/videos?query=some%20video'});

  const result = await searchVideos('hong kong', {videos: new Link(links._links.videos)});

  expect(result).toEqual([
    {title: 'KS3/4 Science: Demonstrating Chemistry'},
    {title: 'KS3/4 Science: Big Screen Science'},
  ]);
});