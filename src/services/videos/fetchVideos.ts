import axios from 'axios';
import DurationConverter from '../../components/searchResults/filters/DurationConverter';
import { Links } from '../../types/Links';
import { VideoSearchResult } from '../../types/SearchResults';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';
import { parseVideosResponse } from './parseVideosResponse';

export default function fetchVideos(
  searchRequest: VideoSearchRequest,
  links: Links,
): Promise<VideoSearchResult> {
  const durationConverter = new DurationConverter();

  const duration =
    searchRequest.filters.duration &&
    searchRequest.filters.duration.map(({ min, max }) => {
      let durationString = '';

      if (min) {
        durationString += durationConverter.secondsToIso(min);
      } else {
        durationString += 'PT0M';
      }

      if (max) {
        durationString += '-' + durationConverter.secondsToIso(max);
      }

      return durationString;
    });

  const url = links.videos.getTemplatedLink({
    query: searchRequest.query,
    size: searchRequest.size || 10,
    page: searchRequest.page - 1,
    is_classroom: searchRequest.filters.isClassroom,
    sort_by: searchRequest.sortBy,
    type: searchRequest.filters.type,
    duration,
    age_range: searchRequest.filters.age_range,
    age_range_min: searchRequest.filters.age_range_min,
    age_range_max: searchRequest.filters.age_range_max,
    subject: searchRequest.filters.subject,
    promoted: searchRequest.filters.promoted,
  });

  return axios
    .get(url)
    .then(response => parseVideosResponse(response, searchRequest.query));
}
