import {
  UpdateAgeRangeFilter,
  UpdateDurationFilter,
  SearchRequest,
} from 'src/components/searchResults/redux/actions/updateSearchParametersActions';
import { ParsedQuery } from 'query-string';
import { VideoSearchQuery } from 'src/services/searchParameters/VideoSearchQuery';

export function generateVideoSearchQuery(
  existingQueryParams: VideoSearchQuery,
  updates: SearchRequest[],
): VideoSearchQuery {
  const newQueryParams = updates.map((updateRequest: SearchRequest) =>
    requestToQueryParameters(updateRequest),
  );

  const newQuery = {
    ...existingQueryParams,
    ...newQueryParams.reduce((acc, param) => ({ ...acc, ...param }), []),
    page: 1,
  };

  return newQuery;
}

export const requestToQueryParameters = (
  request: SearchRequest,
): ParsedQuery<string | string[] | number> => ({
  ...request,
  ...convertAgeRangeRequest(request as UpdateAgeRangeFilter),
  ...convertDurationRequest(request as UpdateDurationFilter),
});

const convertAgeRangeRequest = (
  updateAgeRangeFilter: UpdateAgeRangeFilter,
): { age_range: string[] } =>
  updateAgeRangeFilter.age_range
    ? {
        age_range: updateAgeRangeFilter.age_range.map((range) => range.getId()),
      }
    : undefined;

const convertDurationRequest = (
  updateDurationFilter: UpdateDurationFilter,
): { duration: string[] } | undefined =>
  updateDurationFilter.duration
    ? { duration: updateDurationFilter.duration.map((d) => d.toString()) }
    : undefined;
