import queryString from 'query-string';
import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';
import { SearchParameters } from '../../types/SearchParameters';

export const convertQueryToSearchParameters = (
  url: string,
): SearchParameters => {
  const parsedUrl = queryString.parse(url);

  return {
    query: parseQuery(parsedUrl.q),
    duration: DurationRange.fromStrings(parsedUrl.duration) || null,
    ageRange: AgeRange.fromStrings(parsedUrl.age_range) || null,
    ageRangeMin: +parsedUrl.age_range_min || null,
    ageRangeMax: +parsedUrl.age_range_max || null,
    subject: parseSubjects(parsedUrl.subject),
  };
};

export const countSearchFilters = (searchFilters: SearchParameters): number => {
  let numberOfFiltersApplied = 0;

  if (searchFilters.duration !== null) {
    numberOfFiltersApplied += searchFilters.duration.length;
  }

  if (searchFilters.ageRange !== null) {
    numberOfFiltersApplied += searchFilters.ageRange.length;
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
