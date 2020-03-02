import { Range } from 'src/types/Range';

export interface SearchFiltersParameters {
  duration?: Range[];
  ageRangeMin?: number;
  ageRangeMax?: number;
  subject?: string[];
}
