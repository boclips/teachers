export interface CollectionRequestFilters {
  subject: string | string[];
}

export interface CollectionSearchRequest {
  query?: string;
  filters?: CollectionRequestFilters;
}
