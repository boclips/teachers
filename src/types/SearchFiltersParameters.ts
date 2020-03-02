import { Range } from 'src/types/Range';

export interface SearchFiltersParameters {
  query?: string;
  duration?: Range[];
  ageRangeMin?: number;
  ageRangeMax?: number;
  subject?: string[];
}
