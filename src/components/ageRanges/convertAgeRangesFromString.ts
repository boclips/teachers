import { AgeRange } from '@bit/boclips.types.age-range';

export const convertAgeRangesFromString = (
  ageRangeStrings: string | string[],
): AgeRange[] => {
  if (!ageRangeStrings) {
    return [];
  }

  const ageRangeArray = !Array.isArray(ageRangeStrings)
    ? [ageRangeStrings]
    : ageRangeStrings;

  return ageRangeArray.map((ageRange) => {
    const minAndMax = ageRange.split('-');
    return new AgeRange(
      parseInt(minAndMax[0], 10),
      minAndMax[1] ? parseInt(minAndMax[1], 10) : undefined,
    );
  });
};
