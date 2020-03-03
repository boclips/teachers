import { DurationRange } from 'src/types/DurationRange';

export interface SearchParameters {
  query?: string;
  duration?: DurationRange[];
  ageRangeMin?: number;
  ageRangeMax?: number;
  subject?: string[];
}
