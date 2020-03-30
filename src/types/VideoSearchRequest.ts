import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';

export interface VideoSearchRequest {
  query?: string;
  page: number;
  filters: VideoRequestFilters;
  sortBy: SortBy;
  size?: number;
}

export interface VideoRequestFilters {
  type?: string[];
  duration?: DurationRange[];
  age_range?: AgeRange[];
  age_range_min?: number;
  age_range_max?: number;
  subject?: string[];
  promoted?: boolean;
}

export type SortBy = null | 'RELEASE_DATE' | 'RANDOM';
