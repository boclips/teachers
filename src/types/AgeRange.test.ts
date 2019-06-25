import { AgeRange } from './AgeRange';
describe('generating a label', () => {
  test('returns a hyphenated label when ageRange has min and max', () => {
    const ageRange = new AgeRange(5, 11);

    expect(ageRange.getLabel()).toEqual('5 - 11');
  });

  test('returns an n+ label when ageRange has min only', () => {
    const ageRange = new AgeRange(7);

    expect(ageRange.getLabel()).toEqual('7 +');
  });
});

describe('generating an array', () => {
  test('returns a populated array from an age range with min and max', () => {
    const ageRange = new AgeRange(7, 11);

    expect(ageRange.generateRangeArray()).toEqual([7, 8, 9, 10, 11]);
  });

  test('returns an empty array from an age range with no max', () => {
    const ageRange = new AgeRange(11);

    expect(ageRange.generateRangeArray()).toEqual([]);
  });
});

describe('resolving the minimum age', () => {
  test('returns the default min age if given out of bounds min age', () => {
    const ageRange = new AgeRange(-1, 11);

    expect(ageRange.resolveMin()).toEqual(3);
  });
  test('returns the min age if set', () => {
    const ageRange = new AgeRange(5, 11);

    expect(ageRange.resolveMin()).toEqual(5);
  });
});

describe('resolving the maximum age', () => {
  test('returns the default max age if no max age set', () => {
    const ageRange = new AgeRange(3);
    expect(ageRange.resolveMax()).toEqual(19);
  });
  test('returns the max age if set', () => {
    const ageRange = new AgeRange(3, 16);
    expect(ageRange.resolveMax()).toEqual(16);
  });
});
