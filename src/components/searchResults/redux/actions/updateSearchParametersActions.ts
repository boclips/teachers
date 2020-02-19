import { actionCreatorFactory } from 'src/app/redux/actions';

interface SearchPathname {
  pathname?: string;
}

interface UpdateDurationFilter {
  duration_min: number;
  duration_max: number;
}

interface UpdateAgeRangeFilter {
  age_range_min: number;
  age_range_max?: number;
}

interface UpdateSearchQuery {
  q: string;
}

interface UpdateSearchPage {
  page: number;
}

interface UpdateSubjectFilter {
  subject?: string[];
}

export type UpdateAllFilters =
  | UpdateDurationFilter
  | UpdateAgeRangeFilter
  | UpdateSubjectFilter;

export type UpdateSearchParamsRequest =
  | UpdateDurationFilter
  | UpdateAgeRangeFilter
  | UpdateSubjectFilter
  | UpdateSearchQuery
  | UpdateSearchPage
  | SearchPathname;

export const updateSearchParamsAction = actionCreatorFactory<
  UpdateSearchParamsRequest
>('UPDATE_SEARCH_PARAMS');

export const bulkUpdateSearchParamsAction = actionCreatorFactory<
  UpdateSearchParamsRequest[]
>('BULK_UPDATE_SEARCH_PARAMS');

export const bulkOverrideSearchParamsAction = actionCreatorFactory<
  UpdateSearchParamsRequest[]
>('BULK_OVERRIDE_SEARCH_PARAMS');
