import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';

export interface SearchParameters {
  query?: string;
  duration?: DurationRange[];
  ageRange?: AgeRange[];
  ageRangeMin?: number;
  ageRangeMax?: number;
  subject?: string[];
}
