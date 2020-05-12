import { AgeRange } from '@bit/boclips.types.age-range';

export interface CollectionRequestFilters {
  subject?: string | string[];
  age_range_min?: number;
  age_range_max?: number;
  age_range?: AgeRange[];
}

export interface CollectionSearchRequest {
  query?: string;
  filters?: CollectionRequestFilters;
}
