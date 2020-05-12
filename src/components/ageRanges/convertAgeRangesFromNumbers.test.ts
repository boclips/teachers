import { AgeRange } from '@bit/boclips.types.age-range';
import { extractContainedAges } from 'src/components/ageRanges/extractContainedAges';
import { convertAgeRangesFromNumbers } from './convertAgeRangesFromNumbers';

describe('generating a list of ageranges from an array', () => {
  const allAgeRanges = [
    new AgeRange(3, 5),
    new AgeRange(5, 9),
    new AgeRange(9, 11),
    new AgeRange(11, 14),
    new AgeRange(14, 16),
    new AgeRange(16),
  ];

  test('returns a list of age ranges with the correct min and max values', () => {
    const ageRangeValues = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const ageRanges = convertAgeRangesFromNumbers(allAgeRanges, ageRangeValues);

    expect(ageRanges).toContainEqual(new AgeRange(9, 11));
    expect(ageRanges).toContainEqual(new AgeRange(5, 9));
    expect(ageRanges).toContainEqual(new AgeRange(11, 14));
    expect(ageRanges.length).toBe(3);
  });

  test('returns an empty array from an age range with no max', () => {
    const ageRange = new AgeRange(15);

    expect(ageRange.getNumbers()).toEqual([15, 16, 17, 18, 19]);
  });

  test('returns an array of all included ages from a list of sequential AgeRanges', () => {
    const ages = [3, 4, 5, 6, 7, 8, 9];
    const ageRanges = convertAgeRangesFromNumbers(allAgeRanges, ages);
    const contained = extractContainedAges(ageRanges);
    expect(contained).toEqual(ages);
  });

  test('returns an array of all included ages from a list of nonsequential AgeRanges', () => {
    const ages = [5, 6, 7, 8, 9, 11, 12, 13, 14];
    const ageRanges = convertAgeRangesFromNumbers(allAgeRanges, ages);
    const contained = extractContainedAges(ageRanges);
    expect(contained).toEqual(ages);
  });

  test('omits 16+', () => {
    const ages = [3, 4, 5, 11, 12, 13, 14, 15, 16];

    const ageRanges = convertAgeRangesFromNumbers(allAgeRanges, ages);

    expect(ageRanges).toEqual([
      { max: 5, min: 3 },
      { max: 14, min: 11 },
      { max: 16, min: 14 },
    ]);
  });

  test('includes 16+', () => {
    const ages = [3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    const ageRanges = convertAgeRangesFromNumbers(allAgeRanges, ages);

    expect(ageRanges).toEqual([
      { max: 5, min: 3 },
      { max: 14, min: 11 },
      { max: 16, min: 14 },
      { max: null, min: 16 },
    ]);
  });
});
