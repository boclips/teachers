import { Subject } from './Subject';

export interface SearchFiltersParameters {
  durationMin?: number;
  durationMax?: number;
  ageRangeMin?: number;
  ageRangeMax?: number;
  subjects?: string[];
}
