import { Range } from 'src/types/Range';
import { actionCreatorFactory } from '../../../../app/redux/actions';

interface SearchPathname {
  pathname?: string;
}

export interface UpdateDurationFilter {
  duration: Range[];
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

export const isUpdateDurationFilterRequest = (
  request: UpdateSearchParamsRequest,
): request is UpdateDurationFilter =>
  !!(request as UpdateDurationFilter).duration;
