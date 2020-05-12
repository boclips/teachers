import { AgeRange } from '@bit/boclips.types.age-range';
import { DurationRange } from 'src/types/DurationRange';

export interface VideoSearchFacets {
  ageRanges: AgeRange[];
  durations: DurationRange[];
}
