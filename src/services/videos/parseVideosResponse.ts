import PageSpec from 'src/types/PageSpec';
import { VideoSearchResult } from '../../types/SearchResults';
import convertVideoResource from './convertVideoResource';

export const MaxElementCount = 500;

function limitPageResponse(page: any): PageSpec {
  const totalElements = Math.min(page.totalElements, MaxElementCount);
  const totalPages = totalElements / page.size;
  return {
    ...page,
    totalElements,
    totalPages,
  };
}

export function parseVideosResponse(
  response: any,
  query: string,
): VideoSearchResult {
  const videos = response.data._embedded.videos.map(convertVideoResource);
  const facets = response.data._embedded.facets;

  return {
    videos,
    facets,
    query,
    paging: limitPageResponse(response.data.page),
  };
}
