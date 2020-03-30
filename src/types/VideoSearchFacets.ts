import { AgeRange } from 'src/types/AgeRange';
import { DurationRange } from 'src/types/DurationRange';

export interface VideoSearchFacets {
  ageRanges: AgeRange[];
  durations: DurationRange[];
}
