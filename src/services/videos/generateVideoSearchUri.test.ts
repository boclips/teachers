import { generateVideoSearchUri } from 'src/services/videos/generateVideoSearchUri';
import {
  LinksFactory,
  VideoSearchFacetsFactory,
  VideoSearchRequestFactory,
} from 'test-support/factories';
import { AgeRange } from 'src/types/AgeRange';

describe('generate video search uri', () => {
  it('includes age range facets', () => {
    const uri = generateVideoSearchUri(
      VideoSearchRequestFactory.sample(),
      VideoSearchFacetsFactory.sample({ ageRanges: [new AgeRange(3, 7)] }),
      LinksFactory.sample(),
    );

    expect(uri).toContain('age_range_facets=3-7');
  });
});
