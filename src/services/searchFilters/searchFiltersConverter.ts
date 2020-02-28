import queryString from 'query-string';
import { SearchFiltersParameters } from '../../types/SearchFiltersParameters';

export const parseSearchParametersFromUrl = (
  url: string,
): SearchFiltersParameters => {
  const parsedUrl = queryString.parse(url);

  return {
    query: parseQuery(parsedUrl.q),
    durationMin: +parsedUrl.duration_min || null,
    durationMax: +parsedUrl.duration_max || null,
    ageRangeMin: +parsedUrl.age_range_min || null,
    ageRangeMax: +parsedUrl.age_range_max || null,
    subject: parseSubjects(parsedUrl.subject),
  };
};

export const getNumberOfSearchFilters = (
  searchFilters: SearchFiltersParameters,
): number => {
  let numberOfFiltersApplied = 0;

  if (
    searchFilters.durationMin !== null ||
    searchFilters.durationMax !== null
  ) {
    numberOfFiltersApplied += 1;
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

const parseSubjects = (subject: string[] | string): string[] =>
  subject == null ? [] : subject.toString().split(',');

const parseQuery = (query: string[] | string): string =>
  query === null || query === undefined ? null : `${query}`;
