export interface SearchRequest {
  query: string;
  page: number;
  filters: RequestFilters;
}

export interface RequestFilters {
  includeTags: string[];
  excludeTags: string[];
}
