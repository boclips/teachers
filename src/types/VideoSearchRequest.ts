import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';
import { SortKey } from 'boclips-api-client/dist/sub-clients/videos/model/SortKey';

export interface VideoSearchRequest {
  query?: string;
  page: number;
  filters: VideoRequestFilters;
  sortBy: SortKey;
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
  resource_types?: string[];
}
