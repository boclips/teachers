import { AgeRange } from './AgeRange';
describe('generating a label', () => {
  test('returns a hyphenated label when ageRange has min and max', () => {
    const ageRange = new AgeRange(5, 11);

    expect(ageRange.getLabel()).toEqual('5-11');
  });

  test('returns an n+ label when ageRange has min only', () => {
    const ageRange = new AgeRange(7);

    expect(ageRange.getLabel()).toEqual('7+');
  });
});

describe('generating an array', () => {
  test('returns a populated array from an age range with min and max', () => {
    const ageRange = new AgeRange(7, 11);

    expect(ageRange.generateRangeArray()).toEqual([7, 8, 9, 10, 11]);
  });

  test('returns an empty array from an age range with no max', () => {
    const ageRange = new AgeRange(11);

    expect(ageRange.generateRangeArray()).toEqual([11]);
  });
});

describe('generating a list of ageranges from an array', () => {
  test('returns a list of age ranges with the correct min and max values', () => {
    const ageRangeValues = [7, 8, 9, 10, 11, 12, 13, 14, 15];

    const ageRanges = AgeRange.generateAgeRanges(ageRangeValues);

    expect(ageRanges).toContainEqual(new AgeRange(9, 11));
    expect(ageRanges).toContainEqual(new AgeRange(7, 9));
    expect(ageRanges).toContainEqual(new AgeRange(11, 14));
    expect(ageRanges.length).toBe(3);
  });

  test('returns an empty array from an age range with no max', () => {
    const ageRange = new AgeRange(11);

    expect(ageRange.generateRangeArray()).toEqual([11]);
  });

  test('returns an array of all included ages from a list of sequential AgeRanges', () => {
    const ages = [3, 4, 5, 6, 7, 8, 9];
    const ageRanges = AgeRange.generateAgeRanges(ages);
    const contained = AgeRange.extractContainedAges(ageRanges);
    expect(contained).toEqual(ages);
  });

  test('returns an array of all included ages from a list of nonsequential AgeRanges', () => {
    const ages = [5, 6, 7, 11, 12, 13, 14];
    const ageRanges = AgeRange.generateAgeRanges(ages);
    const contained = AgeRange.extractContainedAges(ageRanges);
    expect(contained).toEqual(ages);
  });

  test('returns a single age from a lower-bound-only AgeRange', () => {
    const ages = [19];
    const ageRanges = AgeRange.generateAgeRanges(ages);
    const contained = AgeRange.extractContainedAges(ageRanges);
    expect(contained).toEqual(ages);
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

describe('encoding and decoding ageranges as JSON', () => {
  it(`encodes an agerange into json`, () => {
    const ageRange = new AgeRange(10, 15);

    expect(ageRange.encodeJSON()).toEqual(`{"min":10,"max":15}`);
  });

  it(`encodes an agerange with unbounded upper into json`, () => {
    const ageRange = new AgeRange(19);

    expect(ageRange.encodeJSON()).toEqual(`{"min":19}`);
  });

  it(`decodes an agerange with unbounded upper from json`, () => {
    expect(AgeRange.decodeJSON(`{"min":19}`)).toEqual(new AgeRange(19));
  });

  it(`decodes json into an agerange`, () => {
    const jsonAgeRange = `{"min":10, "max":15}`;

    expect(AgeRange.decodeJSON(jsonAgeRange)).toEqual(new AgeRange(10, 15));
  });
});

describe(`removing duplicates`, () => {
  it(`sorts and removes duplicates correctly`, () => {
    const ageRangeList: AgeRange[] = [
      new AgeRange(4, 7),
      new AgeRange(3, 4),
      new AgeRange(3, 4),
      new AgeRange(7, 10),
    ];
    const deduplicatedList: AgeRange[] = AgeRange.removeDuplicates(
      ageRangeList,
    );

    expect(deduplicatedList.length).toEqual(3);
    expect(deduplicatedList[0]).toEqual(new AgeRange(4, 7));
    expect(deduplicatedList[1]).toEqual(new AgeRange(3, 4));
    expect(deduplicatedList[2]).toEqual(new AgeRange(7, 10));
  });
});
