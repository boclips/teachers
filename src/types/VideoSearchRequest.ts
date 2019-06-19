export interface VideoSearchRequest {
  query: string;
  page: number;
  filters: RequestFilters;
  sortBy: SortBy;
}

export interface RequestFilters {
  includeTags: string[];
  excludeTags: string[];
  min_duration?: number;
  max_duration?: number;
}

export type SortBy = null | 'RELEASE_DATE';
