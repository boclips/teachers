import queryString from 'query-string';
import { DurationRange } from 'src/types/DurationRange';
import { convertAgeRangesFromString } from 'src/components/ageRanges/convertAgeRangesFromString';
import { SearchParameters } from '../../types/SearchParameters';

export const convertQueryToSearchParameters = (
  url: string,
): SearchParameters => {
  const parsedUrl = queryString.parse(url);

  return {
    query: parseQuery(parsedUrl.q),
    duration: DurationRange.newFromStrings(parsedUrl.duration) || null,
    ageRange: convertAgeRangesFromString(parsedUrl.age_range) || null,
    subject: parseList(parsedUrl.subject),
    resourceTypes: parseList(parsedUrl.resource_types),
  };
};

export const countSearchFilters = (searchFilters: SearchParameters): number => {
  let numberOfFiltersApplied = 0;

  if (searchFilters.duration !== null) {
    numberOfFiltersApplied += searchFilters.duration.length;
  }

  if (searchFilters.ageRange !== null && searchFilters.ageRange.length !== 0) {
    numberOfFiltersApplied += 1;
  }

  if (searchFilters.subject != null) {
    numberOfFiltersApplied += searchFilters.subject.length;
  }

  if (searchFilters.resourceTypes != null) {
    numberOfFiltersApplied += searchFilters.resourceTypes.length;
  }

  return numberOfFiltersApplied;
};

const parseList = (subject: string[] | string): string[] =>
  subject == null ? [] : subject.toString().split(',');

const parseQuery = (query: string[] | string): string =>
  query === null || query === undefined ? null : `${query}`;
