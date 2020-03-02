import queryString, { ParsedQuery } from 'query-string';
import { Range } from 'src/types/Range';
import {
  isUpdateDurationFilterRequest,
  UpdateSearchParamsRequest,
} from 'src/components/searchResults/redux/actions/updateSearchParametersActions';
import { SearchFiltersParameters } from '../../types/SearchFiltersParameters';

export const parseRanges = (rangeStrings: string | string[]): Range[] => {
  if (!rangeStrings) {
    return null;
  }
  if (!Array.isArray(rangeStrings)) {
    rangeStrings = [rangeStrings];
  }

  return rangeStrings.map(rangeString => {
    const [min, max] = rangeString.split('-');

    if (!min) {
      return null;
    }

    return { min: parseInt(min, 10), max: max && parseInt(max, 10) };
  });
};

export const parseSearchParametersFromUrl = (
  url: string,
): SearchFiltersParameters => {
  const parsedUrl = queryString.parse(url);

  return {
    query: parseQuery(parsedUrl.q),
    duration: parseRanges(parsedUrl.duration) || null,
    ageRangeMin: +parsedUrl.age_range_min || null,
    ageRangeMax: +parsedUrl.age_range_max || null,
    subject: parseSubjects(parsedUrl.subject),
  };
};

export const getNumberOfSearchFilters = (
  searchFilters: SearchFiltersParameters,
): number => {
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
  if (searchFilters.subject != null && searchFilters.subject.length > 0) {
    numberOfFiltersApplied += searchFilters.subject.length;
  }

  return numberOfFiltersApplied;
};

export const requestToQueryParameters = (
  request: UpdateSearchParamsRequest,
): ParsedQuery<string | string[] | number> => {
  if (isUpdateDurationFilterRequest(request)) {
    const duration = request.duration.map(durationRange => {
      let s: string = '' + durationRange.min;
      if (durationRange.max) {
        s += '-' + durationRange.max;
      }
      return s;
    });

    return { ...request, duration };
  } else {
    return { ...request };
  }
};

const parseSubjects = (subject: string[] | string): string[] =>
  subject == null ? [] : subject.toString().split(',');

const parseQuery = (query: string[] | string): string =>
  query === null || query === undefined ? null : `${query}`;
