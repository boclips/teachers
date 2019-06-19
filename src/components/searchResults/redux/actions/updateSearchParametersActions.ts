import { actionCreatorFactory } from '../../../../app/redux/actions';

interface UpdateDurationFilter {
  duration_min: number;
  duration_max?: number;
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

interface UpdateSearchMode {
  mode: string;
}

export type UpdateSearchParamsRequest =
  | UpdateDurationFilter
  | UpdateAgeRangeFilter
  | UpdateSearchQuery
  | UpdateSearchPage
  | UpdateSearchMode;

export const updateSearchParamsAction = actionCreatorFactory<
  UpdateSearchParamsRequest
>('UPDATE_SEARCH_PARAMS');

export const bulkUpdateSearchParamsAction = actionCreatorFactory<
  UpdateSearchParamsRequest[]
>('BULK_UPDATE_SEARCH_PARAMS');

export const bulkOverrideSearchParamsAction = actionCreatorFactory<
  UpdateSearchParamsRequest[]
>('BULK_OVERRIDE_SEARCH_PARAMS');
