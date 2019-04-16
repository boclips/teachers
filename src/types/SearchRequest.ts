export interface SearchRequest {
  query: string;
  page: number;
  filters: RequestFilters;
  sortBy: SortBy;
}

export interface RequestFilters {
  includeTags: string[];
  excludeTags: string[];
}

export type SortBy = null | 'RELEASE_DATE';
