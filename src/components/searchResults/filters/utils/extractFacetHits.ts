import { MaxElementCount } from 'src/services/videos/parseVideosResponse';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';

export const extractFacetHits = (id: string, facets: Facet[]): number => {
  if (!facets) {
    return 0;
  }

  const facet = facets.find((f) => f.id === id);

  if (!facet) {
    return 0;
  }

  return facet.hits > MaxElementCount ? MaxElementCount : facet.hits;
};

export const extractTotalHits = (facets?: Facet[]): number =>
  facets
    ? facets.map((facet) => facet.hits).reduce((acc, value) => acc + value, 0)
    : 0;
