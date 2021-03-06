import { AgeRange } from 'src/types/AgeRange';

export const convertAgeRangesFromNumbers = (
  allAgeRanges: AgeRange[],
  numberArray: number[],
): AgeRange[] => {
  const foundRanges = [];
  allAgeRanges.forEach((range) => {
    const containedAges = range.getNumbers();
    if (containedAges.every((it) => numberArray.includes(it))) {
      foundRanges.push(range);
    }
  });

  return foundRanges;
};
