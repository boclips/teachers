import { VideoSearchRequest } from 'src/types/VideoSearchRequest';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { Links } from 'src/types/Links';

export function generateVideoSearchUri(
  searchRequest: VideoSearchRequest,
  facets: VideoSearchFacets,
  links: Links,
) {
  const durationParams =
    searchRequest.filters.duration &&
    searchRequest.filters.duration.map((duration) => duration.toIso());

  const ageRangeParams =
    searchRequest.filters.age_range &&
    searchRequest.filters.age_range.map((ageRange) => ageRange.getId());

  const ageRangeFacets = facets.ageRanges.map((ageRange) => ageRange.getId());
  const durationFacets = facets.durations.map((duration) => duration.toIso());

  return links.videos.getTemplatedLink({
    query: searchRequest.query,
    size: searchRequest.size || 10,
    page: searchRequest.page - 1,
    sort_by: searchRequest.sortBy,
    type: searchRequest.filters.type,
    duration: durationParams,
    duration_facets: durationFacets,
    age_range: ageRangeParams,
    age_range_facets: ageRangeFacets,
    age_range_min: searchRequest.filters.age_range_min,
    age_range_max: searchRequest.filters.age_range_max,
    subject: searchRequest.filters.subject,
    promoted: searchRequest.filters.promoted,
    resource_types: searchRequest.filters.resource_types,
  });
}
