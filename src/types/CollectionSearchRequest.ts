import { RequestFilters } from './VideoSearchRequest';

export interface CollectionSearchRequest {
  query?: string;
  subject?: string[];
  filters?: RequestFilters;
}
