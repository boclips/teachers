import {
  VideoSearchFacetsFactory,
  VideoSearchRequestFactory,
} from 'test-support/factories';
import { AgeRange } from 'src/types/AgeRange';
import { DurationRange } from 'src/types/DurationRange';
import { createApiVideoSearchRequest } from 'src/services/videos/createApiVideoSearchRequest';

describe('generate video search request', () => {
  it('includes age range facets', () => {
    const request = createApiVideoSearchRequest(
      VideoSearchRequestFactory.sample(),
      VideoSearchFacetsFactory.sample({ ageRanges: [new AgeRange(3, 7)] }),
    );

    expect(request.age_range_facets).toContain('3-7');
  });

  it('includes duration facets', () => {
    const request = createApiVideoSearchRequest(
      VideoSearchRequestFactory.sample(),
      VideoSearchFacetsFactory.sample({
        durations: [new DurationRange({ min: 0, max: 120 })],
      }),
    );

    expect(request.duration_facets).toContain('PT0S-PT2M');
  });

  it('includes resource type filters', () => {
    const request = createApiVideoSearchRequest(
      {
        page: undefined,
        filters: {
          resource_types: ['ACTIVITY'],
        },
        sortBy: undefined,
      },
      VideoSearchFacetsFactory.sample(),
    );

    expect(request.resource_types).toContain('ACTIVITY');
  });
});
