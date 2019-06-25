import axios from 'axios';
import DurationConverter from '../../components/searchResults/multiple-results/filters/DurationConverter';
import { Links } from '../../types/Links';
import { VideoSearchResults } from '../../types/State';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';
import { parseVideosResponse } from './parseVideosResponse';

export default function fetchVideos(
  searchRequest: VideoSearchRequest,
  links: Links,
): Promise<VideoSearchResults> {
  const durationConverter = new DurationConverter();

  const url = links.videos.getTemplatedLink({
    query: searchRequest.query,
    size: 10,
    page: searchRequest.page - 1,
    include_tag: searchRequest.filters.includeTags,
    exclude_tag: searchRequest.filters.excludeTags,
    sort_by: searchRequest.sortBy,
    duration_min: durationConverter.secondsToIso(
      searchRequest.filters.duration_min,
    ),
    duration_max: durationConverter.secondsToIso(
      searchRequest.filters.duration_max,
    ),
    age_range_min: searchRequest.filters.age_range_min,
    age_range_max: searchRequest.filters.age_range_max,
    subject: searchRequest.filters.subject,
  });
  return axios
    .get(url)
    .then(response => parseVideosResponse(response, searchRequest.query));
}
