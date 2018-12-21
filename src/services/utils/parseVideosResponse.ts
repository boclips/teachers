import AppConfig from '../../app/AppConfig';
import { SearchResults } from '../../redux/State';
import convertVideoResource from './convertVideoResource';

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
