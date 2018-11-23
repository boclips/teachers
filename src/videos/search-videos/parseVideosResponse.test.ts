import { videos } from '../../video-service-responses';
import { parseVideosResponse } from './parseVideosResponse';

test('parses a response from video-service to SearchResults', () => {
  const searchResults = parseVideosResponse(
    {
      data: videos,
      headers: {
        'x-correlation-id': '',
      },
    },
    'some-query',
  );

  expect(searchResults.query).toBeDefined();
  expect(searchResults.paging).toBeDefined();
  expect(searchResults.searchId).toBeDefined();
  expect(searchResults.videos).toBeDefined();
});
