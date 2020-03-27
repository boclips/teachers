import { Facet } from 'src/types/VideoFacets';

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

  return facet[id].hits;
};
