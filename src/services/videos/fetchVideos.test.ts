import { DurationRange } from 'src/types/DurationRange';
import { SortKey } from 'boclips-api-client/dist/sub-clients/videos/model/SortKey';
import { ApiClientWrapper } from 'src/services/apiClient';
import {
  FakeBoclipsClient,
  SubjectFactory,
} from 'boclips-api-client/dist/test-support';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { VideoSearchResult } from 'src/types/SearchResults';
import { FacetsFactory } from 'boclips-api-client/dist/test-support/FacetsFactory';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import fetchVideos from './fetchVideos';
import { VideoType } from '../../types/Video';

describe('fetchVideos', () => {
  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.videos.insertVideo(
      VideoFactory.sample({
        title: 'test foo',
        subjects: [SubjectFactory.sample({ id: 'subject-one-id' })],
        types: [{ id: 0, name: VideoType.INSTRUCTIONAL }],
      }),
    );
    client.videos.setFacets(
      FacetsFactory.sample({
        ageRanges: [
          {
            id: '3-5',
            name: '3-5',
            hits: 3,
          },
        ],
        subjects: [
          {
            id: 'art-id',
            name: 'art-id',
            hits: 10,
          },
          {
            id: 'other-id',
            name: 'other-id',
            hits: 12,
          },
        ],
        durations: [
          {
            id: 'PT10M-PT20M',
            name: 'PT10M-PT20M',
            hits: 3,
          },
        ],
        resourceTypes: [
          {
            id: 'Activity',
            name: 'Activity',
            hits: 2,
          },
        ],
      }),
    );
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
          type: [VideoType.INSTRUCTIONAL],
          subject: ['subject-one-id'],
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
    expect(findFacetById(resultFacets.ageRanges, '3-5').hits).toEqual(3);
    expect(findFacetById(resultFacets.subjects, 'art-id').hits).toEqual(10);
    expect(findFacetById(resultFacets.durations, 'PT10M-PT20M').hits).toEqual(
      3,
    );
    expect(findFacetById(resultFacets.resourceTypes, 'Activity').hits).toEqual(
      2,
    );
  });

  const findFacetById = (facets: Facet[], id: string): Facet => {
    return facets.find((facet) => facet.id === id);
  };
});
