import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';

export interface SearchParameters {
  query?: string;
  duration?: DurationRange[];
  ageRange?: AgeRange[];
  subject?: string[];
}
