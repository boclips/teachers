import queryString, { ParsedQuery } from 'query-string';
import {
  isUpdateDurationFilterRequest,
  UpdateSearchParamsRequest,
} from 'src/components/searchResults/redux/actions/updateSearchParametersActions';
import { DurationRange } from 'src/types/DurationRange';
import { SearchParameters } from '../../types/SearchParameters';

export const convertQueryToSearchParameters = (
  url: string,
): SearchParameters => {
  const parsedUrl = queryString.parse(url);

  return {
    query: parseQuery(parsedUrl.q),
    duration: DurationRange.fromStrings(parsedUrl.duration) || null,
    ageRangeMin: +parsedUrl.age_range_min || null,
    ageRangeMax: +parsedUrl.age_range_max || null,
    subject: parseSubjects(parsedUrl.subject),
  };
};

export const requestToQueryParameters = (
  request: UpdateSearchParamsRequest,
): ParsedQuery<string | string[] | number> => {
  if (isUpdateDurationFilterRequest(request)) {
    const duration = request.duration.map(range => range.serialise());

    return { ...request, duration };
  } else {
    return { ...request };
  }
};

export const countSearchFilters = (searchFilters: SearchParameters): number => {
  let numberOfFiltersApplied = 0;

  if (searchFilters.duration !== null) {
    numberOfFiltersApplied += searchFilters.duration.length;
  }

  if (
    searchFilters.ageRangeMin !== null ||
    searchFilters.ageRangeMax !== null
  ) {
    numberOfFiltersApplied += 1;
  }

  if (searchFilters.subject != null) {
    numberOfFiltersApplied += searchFilters.subject.length;
  }

  return numberOfFiltersApplied;
};

const parseSubjects = (subject: string[] | string): string[] =>
  subject == null ? [] : subject.toString().split(',');

const parseQuery = (query: string[] | string): string =>
  query === null || query === undefined ? null : `${query}`;
