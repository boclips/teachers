import { VideoResults } from '../../types/SearchResults';
import convertVideoResource from './convertVideoResource';

export function parseVideosResponse(
  response: any,
  query: string,
): VideoResults {
  const videos = response.data._embedded.videos.map(convertVideoResource);

  return {
    videos,
    query,
    paging: response.data.page,
  };
}
