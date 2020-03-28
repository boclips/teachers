import { AgeRange } from 'src/types/AgeRange';

export const extractContainedAges = (ages: AgeRange[]): number[] => {
  const rangeArrays = ages.map(it => it.getNumbers());
  const flattenedAgeRanges: number[] = [].concat.apply([], rangeArrays);
  return Array.from(new Set(flattenedAgeRanges));
};
