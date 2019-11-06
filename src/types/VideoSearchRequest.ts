export interface VideoSearchRequest {
  query?: string;
  page: number;
  filters: RequestFilters;
  sortBy: SortBy;
  size?: number;
}

export interface RequestFilters {
  includeTags: string[];
  excludeTags: string[];
  duration_min?: number;
  duration_max?: number;
  age_range_min?: number;
  age_range_max?: number;
  subject?: string[];
  promoted?: boolean;
}

export type SortBy = null | 'RELEASE_DATE' | 'RANDOM';
