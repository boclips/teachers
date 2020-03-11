import { videos } from '../../../test-support/api-responses';
import { parseVideosResponse } from './parseVideosResponse';

describe('parseVideosResponse', () => {
  it('parses a response from video-service to SearchResults', () => {
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

  it('limits the total elements from search to 500', () => {
    const response = {
      data: {
        ...videos,
        page: {
          size: 10,
          totalElements: 120340,
          totalPages: 12034,
          number: 0,
        },
      },
    };

    const videoSearchResult = parseVideosResponse(response, 'test');

    expect(videoSearchResult.paging.totalElements).toEqual(500);
    expect(videoSearchResult.paging.totalPages).toEqual(50);
  });

  it('does not limit total elements from search when below 500', () => {
    const response = {
      data: {
        ...videos,
        page: {
          size: 10,
          totalElements: 120,
          totalPages: 12,
          number: 0,
        },
      },
    };

    const videoSearchResult = parseVideosResponse(response, 'test');

    expect(videoSearchResult.paging.totalElements).toEqual(120);
    expect(videoSearchResult.paging.totalPages).toEqual(12);
  });
});
