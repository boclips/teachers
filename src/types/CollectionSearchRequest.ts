import { VideoRequestFilters } from './VideoSearchRequest';

export interface CollectionSearchRequest {
  query?: string;
  subject?: string[];
  filters?: VideoRequestFilters;
}
