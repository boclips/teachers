import { VideoSearchRequest } from 'src/types/VideoSearchRequest';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { Links } from 'src/types/Links';
import DurationConverter from 'src/components/searchResults/filters/DurationConverter';

export function generateVideoSearchUri(
  searchRequest: VideoSearchRequest,
  facets: VideoSearchFacets,
  links: Links,
) {
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

  const age_range =
    searchRequest.filters.age_range &&
    searchRequest.filters.age_range.map(ageRange => ageRange.getId());

  const age_range_facets = facets.ageRanges.map(ageRange => ageRange.getId());

  return links.videos.getTemplatedLink({
    query: searchRequest.query,
    size: searchRequest.size || 10,
    page: searchRequest.page - 1,
    sort_by: searchRequest.sortBy,
    type: searchRequest.filters.type,
    duration,
    age_range,
    age_range_facets,
    age_range_min: searchRequest.filters.age_range_min,
    age_range_max: searchRequest.filters.age_range_max,
    subject: searchRequest.filters.subject,
    promoted: searchRequest.filters.promoted,
  });
}
