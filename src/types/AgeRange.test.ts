import { AgeRange } from './AgeRange';
describe('generating a label', () => {
  test('returns a hyphenated label when ageRange has min and max', () => {
    const ageRange = new AgeRange({ min: 5, max: 11 });

    expect(ageRange.getLabel()).toEqual('5 - 11');
  });

  test('returns an n+ label when ageRange has min only', () => {
    const ageRange = new AgeRange({ min: 7 });

    expect(ageRange.getLabel()).toEqual('7 +');
  });
});

describe('generating an array', () => {
  test('returns a populated array from an age range with min and max', () => {
    const ageRange = new AgeRange({ min: 7, max: 11 });

    expect(ageRange.generateRangeArray()).toEqual([7, 8, 9, 10, 11]);
  });

  test('returns an empty array from an age range with no max', () => {
    const ageRange = new AgeRange({ min: 11 });

    expect(ageRange.generateRangeArray()).toEqual([]);
  });
});
