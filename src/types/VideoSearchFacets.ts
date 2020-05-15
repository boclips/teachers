import { AgeRange } from 'src/types/AgeRange';
import { DurationRange } from 'src/types/DurationRange';
import { ResourceType } from 'src/types/ResourceType';

export interface VideoSearchFacets {
  ageRanges: AgeRange[];
  durations: DurationRange[];
  resourceTypes: ResourceType[];
}
