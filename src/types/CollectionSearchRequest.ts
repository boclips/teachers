import { AgeRange } from 'src/types/AgeRange';

export interface CollectionRequestFilters {
  age_range_min?: number;
  age_range_max?: number;
  resource_types?: string[];
  subject?: string | string[];
  age_range?: AgeRange[];
  sort_by?: CollectionSort[];
}

export interface CollectionSearchRequest {
  query?: string;
  filters?: CollectionRequestFilters;
}

type CollectionSort = 'IS_DEFAULT' | 'UPDATED_AT' | 'HAS_ATTACHMENT';
