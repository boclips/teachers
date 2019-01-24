import { Constants } from '../../app/AppConstants';
import { SearchResults } from '../../types/State';
import convertVideoResource from './convertVideoResource';

export function parseVideosResponse(
  response: any,
  query: string,
): SearchResults {
  const videos = response.data._embedded.videos.map(convertVideoResource);
  const correlationId = response.headers[Constants.CORRELATION_ID_HEADER_FIELD];

  return {
    videos,
    searchId: correlationId,
    query,
    paging: response.data.page,
  };
}
