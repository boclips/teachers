import { DurationRange } from 'src/types/DurationRange';
import { SortKey } from 'boclips-api-client/dist/sub-clients/videos/model/SortKey';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { VideoSearchResult } from 'src/types/SearchResults';
import fetchVideos from './fetchVideos';
import { VideoType } from '../../types/Video';

describe('fetchVideos', () => {
  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.videos.insertVideo(VideoFactory.sample({ title: 'test foo' }));
    client.videos.setFacets({
      ageRanges: {
        '3-5': {
          hits: 3,
        },
      },
      subjects: {
        'art-id': {
          hits: 10,
        },
        'other-id': {
          hits: 12,
        },
      },
      durations: {
        'PT10M-PT20M': {
          hits: 3,
        },
      },
      resourceTypes: {
        Activity: {
          hits: 2,
        },
      },
    });
  });

  it('can search by query', async () => {
    const searchResult: VideoSearchResult = await fetchVideos(
      {
        query: 'foo',
        page: 1,
        filters: {
          duration: [new DurationRange({ min: 100, max: 200 })],
          age_range_min: 5,
          age_range_max: 11,
          type: [VideoType.STOCK, VideoType.INSTRUCTIONAL],
          subject: ['subject-one-id', 'subject-two-id'],
        },
        sortBy: SortKey.RELEASE_DATE,
      },
      {
        ageRanges: [],
        durations: [],
        resourceTypes: [],
      },
    );

    expect(searchResult.videos.length).toEqual(1);
  });

  it(`can handle facets in search results`, async () => {
    const searchResult: VideoSearchResult = await fetchVideos(
      {
        query: 'foo',
        page: 1,
        filters: {},
        sortBy: SortKey.NOT_SORTED,
      },
      {
        ageRanges: [],
        durations: [],
        resourceTypes: [],
      },
    );

    const resultFacets = searchResult.facets;
    expect(resultFacets.ageRanges['3-5'].hits).toEqual(3);
    expect(resultFacets.subjects['art-id'].hits).toEqual(10);
    expect(resultFacets.durations['PT10M-PT20M'].hits).toEqual(3);
    expect(resultFacets.resourceTypes.Activity.hits).toEqual(2);
  });
});
