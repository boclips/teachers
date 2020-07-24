import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';
import { actionCreatorFactory } from '../../../../app/redux/actions';

export interface SearchPathname {
  pathname?: string;
}

export interface UpdateDurationFilter {
  duration: DurationRange[];
}

export interface UpdateAgeRangeFilter {
  age_range: AgeRange[];
}

export interface UpdateSearchQuery {
  q: string;
}

export interface UpdateSearchPage {
  page: number;
}

export interface UpdateSubjectFilter {
  subject?: string[];
}

export interface UpdateResourceTypeFilter {
  resource_types?: string[];
}

export interface AppliedSuggestedCompletion {
  completion_id?: string;
}

export type UpdateAllFilters =
  | UpdateDurationFilter
  | UpdateAgeRangeFilter
  | UpdateSubjectFilter
  | UpdateResourceTypeFilter;

export type SearchRequest =
  | UpdateDurationFilter
  | UpdateAgeRangeFilter
  | UpdateSubjectFilter
  | UpdateResourceTypeFilter
  | UpdateSearchQuery
  | UpdateSearchPage
  | SearchPathname
  | AppliedSuggestedCompletion;

export const updateSearchParamsAction = actionCreatorFactory<SearchRequest>(
  'UPDATE_SEARCH_PARAMS',
);

export const bulkUpdateSearchParamsAction = actionCreatorFactory<
  SearchRequest[]
>('BULK_UPDATE_SEARCH_PARAMS');
