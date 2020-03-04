import { DurationRange } from 'src/types/DurationRange';

export interface VideoSearchRequest {
  query?: string;
  page: number;
  filters: VideoRequestFilters;
  sortBy: SortBy;
  size?: number;
}

export interface VideoRequestFilters {
  isClassroom?: boolean;
  type?: string[];
  duration?: DurationRange[];
  age_range_min?: number;
  age_range_max?: number;
  subject?: string[];
  promoted?: boolean;
}

export type SortBy = null | 'RELEASE_DATE' | 'RANDOM';
