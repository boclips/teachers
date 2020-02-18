import { videos } from 'test-support/api-responses';
import { parseVideosResponse } from './parseVideosResponse';

test('parses a response from video-service to SearchResults', () => {
  const searchResults = parseVideosResponse(
    {
      data: videos,
    },
    'some-query',
  );

  expect(searchResults.query).toBeDefined();
  expect(searchResults.paging).toBeDefined();
  expect(searchResults.videos).toBeDefined();
});
