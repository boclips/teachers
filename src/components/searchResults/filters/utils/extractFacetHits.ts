import { Facet } from 'src/types/VideoFacets';
import { MaxElementCount } from 'src/services/videos/parseVideosResponse';

export const extractFacetHits = (
  id: string,
  facet: { [id: string]: Facet },
): number => {
  if (!facet) {
    return 0;
  }

  if (!facet[id]) {
    return 0;
  }

  return facet[id].hits > MaxElementCount ? MaxElementCount : facet[id].hits;
};

export const extractTotalHits = (facets?: { [id: string]: Facet }): number =>
  facets
    ? Object.keys(facets)
        .map((key) => facets[key].hits)
        .reduce((acc, value) => acc + value, 0)
    : 0;
