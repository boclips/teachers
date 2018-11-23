import AppConfig from '../../AppConfig';
import { SearchResults } from '../../State';
import convertVideoResource from '../convertVideoResource';

export function parseVideosResponse(
  response: any,
  query: string,
): SearchResults {
  const videos = response.data._embedded.videos.map(convertVideoResource);
  const correlationId =
    response.headers[AppConfig.getCorrelationIdHeaderField()];

  return {
    videos,
    searchId: correlationId,
    query,
    paging: response.data.page,
  };
}
