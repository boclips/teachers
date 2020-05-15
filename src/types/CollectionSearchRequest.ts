import { AgeRange } from 'src/types/AgeRange';

export interface CollectionRequestFilters {
  subject?: string | string[];
  age_range_min?: number;
  age_range_max?: number;
  age_range?: AgeRange[];
  resource_types?: string[];
}

export interface CollectionSearchRequest {
  query?: string;
  filters?: CollectionRequestFilters;
}
