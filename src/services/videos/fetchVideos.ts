import axios from 'axios';
import { Links } from 'src/types/Links';
import { VideoSearchResult } from 'src/types/SearchResults';
import { VideoSearchRequest } from 'src/types/VideoSearchRequest';
import DurationConverter from '../../components/searchResults/filters/DurationConverter';
import { parseVideosResponse } from './parseVideosResponse';

export default function fetchVideos(
  searchRequest: VideoSearchRequest,
  links: Links,
): Promise<VideoSearchResult> {
  const durationConverter = new DurationConverter();

  const url = links.videos.getTemplatedLink({
    query: searchRequest.query,
    size: searchRequest.size || 10,
    page: searchRequest.page - 1,
    is_classroom: searchRequest.filters.isClassroom,
    sort_by: searchRequest.sortBy,
    type: searchRequest.filters.type,
    duration_min: durationConverter.secondsToIso(
      searchRequest.filters.duration_min,
    ),
    duration_max: durationConverter.secondsToIso(
      searchRequest.filters.duration_max,
    ),
    age_range_min: searchRequest.filters.age_range_min,
    age_range_max: searchRequest.filters.age_range_max,
    subject: searchRequest.filters.subject,
    promoted: searchRequest.filters.promoted,
  });

  return axios
    .get(url)
    .then(response => parseVideosResponse(response, searchRequest.query));
}
