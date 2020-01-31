export interface CollectionRequestFilters {
  subject?: string | string[];
  age_range_min?: number;
  age_range_max?: number;
}

export interface CollectionSearchRequest {
  query?: string;
  filters?: CollectionRequestFilters;
}
