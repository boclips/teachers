import { VideoSearchResults } from '../../types/State';
import convertVideoResource from './convertVideoResource';

export function parseVideosResponse(
  response: any,
  query: string,
): VideoSearchResults {
  const videos = response.data._embedded.videos.map(convertVideoResource);

  return {
    videos,
    query,
    paging: response.data.page,
  };
}
