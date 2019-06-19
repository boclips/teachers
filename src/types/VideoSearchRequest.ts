export interface VideoSearchRequest {
  query: string;
  page: number;
  filters: RequestFilters;
  sortBy: SortBy;
}

export interface RequestFilters {
  includeTags: string[];
  excludeTags: string[];
  duration_min?: number;
  duration_max?: number;
}

export type SortBy = null | 'RELEASE_DATE';
