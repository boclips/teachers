import { Range } from 'src/types/Range';

export interface SearchParameters {
  query?: string;
  duration?: Range[];
  ageRangeMin?: number;
  ageRangeMax?: number;
  subject?: string[];
}
