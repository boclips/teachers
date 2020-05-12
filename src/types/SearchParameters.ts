import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from '@bit/boclips.types.age-range';

export interface SearchParameters {
  query?: string;
  duration?: DurationRange[];
  ageRange?: AgeRange[];
  subject?: string[];
}
