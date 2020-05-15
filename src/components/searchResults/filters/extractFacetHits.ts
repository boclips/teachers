import { Facet } from 'src/types/VideoFacets';
import { MaxElementCount } from 'src/services/videos/parseVideosResponse';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';

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
