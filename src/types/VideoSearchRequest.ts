export interface VideoSearchRequest {
  query?: string;
  page: number;
  filters: VideoRequestFilters;
  sortBy: SortBy;
  size?: number;
}

export interface VideoRequestFilters {
  includeTags: string[];
  excludeTags?: string[];
  type?: string[];
  duration_min?: number;
  duration_max?: number;
  age_range_min?: number;
  age_range_max?: number;
  subject?: string[];
  promoted?: boolean;
}

export type SortBy = null | 'RELEASE_DATE' | 'RANDOM';
