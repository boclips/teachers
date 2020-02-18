import { VideoSearchResult } from 'src/types/SearchResults';
import convertVideoResource from './convertVideoResource';

export function parseVideosResponse(
  response: any,
  query: string,
): VideoSearchResult {
  const videos = response.data._embedded.videos.map(convertVideoResource);

  return {
    videos,
    query,
    paging: response.data.page,
  };
}
