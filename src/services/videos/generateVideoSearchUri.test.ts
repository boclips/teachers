import { generateVideoSearchUri } from 'src/services/videos/generateVideoSearchUri';
import {
  LinksFactory,
  VideoSearchFacetsFactory,
  VideoSearchRequestFactory,
} from 'test-support/factories';
import { AgeRange } from 'src/types/AgeRange';
import { DurationRange } from 'src/types/DurationRange';

describe('generate video search uri', () => {
  it('includes age range facets', () => {
    const uri = generateVideoSearchUri(
      VideoSearchRequestFactory.sample(),
      VideoSearchFacetsFactory.sample({ ageRanges: [new AgeRange(3, 7)] }),
      LinksFactory.sample(),
    );

    expect(uri).toContain('age_range_facets=3-7');
  });

  it('includes duration facets', () => {
    const uri = generateVideoSearchUri(
      VideoSearchRequestFactory.sample(),
      VideoSearchFacetsFactory.sample({
        durations: [new DurationRange({ min: 0, max: 120 })],
      }),
      LinksFactory.sample(),
    );

    expect(uri).toContain('duration_facets=PT0S-PT2M');
  });
});
